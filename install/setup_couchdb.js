var rl = require('readline-sync');
var request = require('sync-request');
var conv = require('binstring');

var baseUrl;
while (true) {
	console.log('Please your CouchDB admin password:');
	var adminPassword = rl.question('Please enter your CouchDB admin password: ');

	baseUrl = `http://admin:${adminPassword}@127.0.0.1:5984`;	
	var testResponse = request('GET', `${baseUrl}/_membership`);
	if (testResponse.statusCode == 200) {
		break;
	} else {
		console.log("Invalid password!")
	}
}

// Create system dbs
console.log('Creating system dbs...');
request('PUT', `${baseUrl}/_users`);
request('PUT', `${baseUrl}/_replicator`);
console.log('Created system dbs!');

// Get the name of the node to use in subsequent config requests
var nodesResponse = JSON.parse(request('GET', `${baseUrl}/_membership`).getBody('utf8'));
var nodeName = nodesResponse['all_nodes'][0];
var configUrl = `${baseUrl}/_node/${nodeName}/_config`;
console.log(`Found node named '${nodeName}' and will use url ${configUrl} for config`);

var data = {};

console.log('Turning on couch_peruser setting to enable isolated dbs for every user');
request('PUT', `${configUrl}/couch_peruser/enable`, { json: 'true' }).getBody('utf8');

console.log('Turning on allow_persistent_cookies setting so auth cookies do not expire');
request('PUT', `${configUrl}/couch_httpd_auth/allow_persistent_cookies`, { json: 'true' }).getBody('utf8');

console.log('\nNow we will create a user account for the app:')
data.userEmail = rl.question('email: ');
data.userPassword = rl.question('password: ');

// CouchDB automatically creates a db for each user with this format, app expects this to be a role
var userDb = `userdb-${conv(data.userEmail, { out: 'hex' })}`;
console.log(`DB will be ${userDb}`);

var userBody = {
	name: data.userEmail,
	password: data.userPassword,
	type: 'user',
	roles: [
		data.userEmail, 
		'verified', 	  // app flag - user is verified
		'exp-4102444799',  // financier flag - expires 2099
		userDb  
	]
};

console.log(request('PUT', `${baseUrl}/_users/org.couchdb.user:${data.userEmail}`, { json: userBody }).getBody('utf8'));

/*
console.log('Please enter an admin password for the entire CouchDB instance (this locks down the couchdb instance):');
data.adminPassword = rl.question('admin password: ');

request('PUT', `${configUrl}/admins/admin`, { json: data.adminPassword }).getBody('utf8');
console.log('User \'admin\' created!  All API requests now require authentication.');
*/
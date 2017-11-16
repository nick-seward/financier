<h1 align="center">financier</h1>

<p align="center">
  <a href="https://gitlab.com/financier/financier">⚙ Gitlab</a> —
  <a href="https://app.financier.io">💰 Production app</a> —
  <a href="https://staging.financier.io">Staging app</a> —
  <a href="https://staging.financier.io/docs">📗 Staging Docs</a> —
  <a href="https://trello.com/b/bXcFuXrm">📢 Trello</a> —
  <a href="https://financier.io">🕸 Website</a> —
  <a href="https://gitlab.com/financier/financier/container_registry">🐳 Docker</a>
</p>

> A web-based, offline-first app. Built with Angular 1 and PouchDB.

[![build status](https://gitlab.com/financier/financier/badges/master/build.svg)](https://gitlab.com/financier/financier/commits/master)

### Develop

```sh
npm start
npm install
```

### Test

```sh
npm test
# or continuous: `npm run test-watch`
```

### Build (for production)

```sh
npm run build
```

### Run locally

```sh
gulp build
npm run-script docs # generate jsdoc documentation
node ./api
```

### Docs

Local docs would be `http://localhost:8080/docs`.

Generate with `npm run docs`.


### CouchDB setup

Install CouchDB 2.1+ from http://docs.couchdb.org/en/master/install/index.html

```
curl -X GET http://127.0.0.1:5984/_membership
```

Should get a response like 
```
{"all_nodes":["couchdb@localhost"],"cluster_nodes":["couchdb@localhost"]}
```

Create system dbs
```
curl -X PUT http://127.0.0.1:5984/_users
curl -X PUT http://127.0.0.1:5984/_replicator
curl -X PUT http://127.0.0.1:5984/_node/couchdb@localhost/_config/couch_peruser/enable -d '"true"'
curl -X PUT http://127.0.0.1:5984/_node/couchdb@localhost/_config/couch_httpd_auth/allow_persistent_cookies -d '"true"'
curl -X PUT http://127.0.0.1:5984/_node/couchdb@localhost/_config/admins/admin -d '"myadminpassword"'
```

Now create a user

Create user:
```
curl -X PUT http://admin:mypassword@localhost:5984/_users/org.couchdb.user:calebt@example.org \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"name": "calebt@example.org", "password": "mypass", "roles": ["calebt@example.org", "verified" "exp-4102444799"], "type": "user"}'
```

In db.js, change https:// to http
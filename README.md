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


### CouchDB setup (osx)

```
brew install couchdb
brew services start couchdb
curl http://localhost:5984
```

edit /usr/local/etc/couchdb/local.ini

```
WWW-Authenticate = Basic realm="administrator"
require_valid_user = true

[admins]
admin = mypassword
```

```
brew services restart couchdb
```

In the examples below, replace the uuid with a new one if you want multiple user databases.

Create user:
```
curl -X PUT http://admin:mypassword@localhost:5984/_users/org.couchdb.user:calebt@example.org \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"name": "calebt@example.org", "password": "mypass", "roles": ["calebt@example.org", "verified", "userdb-b1284cd5a340420a87858bc58da1c252", "exp-4102444799"], "type": "user"}'
```

Create database:
```
curl -X PUT http://admin:mypassword@127.0.0.1:5984/userdb-b1284cd5a340420a87858bc58da1c252
```

Make user an admin of this db:
```
curl -X PUT http://admin:mypassword@localhost:5984/userdb-b1284cd5a340420a87858bc58da1c252/_security \
     -H "Content-Type: application/json" \
     -d '{"admins": { "names": ["calebt@example.org"], "roles": [] }, "members": { "names": [], "roles": [] } }'
```



In db.js, change https:// to http
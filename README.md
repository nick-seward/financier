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

NOTE: This is a fork of the main <a href="https://gitlab.com/financier/financier">financier app</a> written by aeharding.  Thanks for all of your hard work, and THANK YOU for open sourcing the front end!

The main differences in this repo are scripts for getting financier up and running quickly on a clean ubuntu 16.x install, and requests to /db are proxied to a local CouchDB install.

### Ubuntu 16.x Install

On a clean ubunutu install:

First create a non-root user and log in as this user:

```
adduser financier
# follow the prompts

# This gives financier user sudo access
usermod -aG sudo financier

# Log in as this user
su financier
cd ~/
```

Now once you're logged in as a non-root user, run:

```
bash <(curl -s https://gitlab.com/caleb3141/financier/raw/master/install/ubuntu_install.sh)
```

Notes:
* When the CouchDB installation prompts you for input, use the defaults (and be sure to enter an admin password)

This will:
1. Install CouchDB 2.x
1. Install node js
1. Install git
1. Download financier (from this repo)
1. Configure CouchDB
1. Start the financier web app and daemonize it.

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

```
node ./install/setup_couchdb.js
```
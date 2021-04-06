# transfer-replitdb
A node.js module that allows you to effortlessly transfer your ReplitDB data without completely rewriting your app when moving a project to a different hosting platform.

## Example
```js
const Database = require("transfer-replitdb")
const db = new Database()

db.set("userInfo", { difficulty: "Easy" });

db.get("userInfo.balance").then(value => { console.log(value) });
```

## Importing data from ReplitDB

```js
db.import("ReplitDB URL")

// Get your ReplitDB url by running `echo $REPLIT_DB_URL` in your old Repl's terminal.
```

## Commands
**Import** the database
``const Database = require("transfer-replitdb")``

**Create** a new database
``const db = new Database()``

**Set** a key to a value
``db.set("key", "value").then(() => {});``

**Get** a key's value
``db.get("key").then(value => {});``

**Delete** a key
``db.delete("key").then(() => {});``

**List** all keys
``db.list().then(keys => {});``

**List** all keys with a prefix
``db.list("prefix").then(matches => {});``

**Empty** the database
``db.empty().then(() => {});``

**Get all** keys and values
``db.getAll().then(all => {});``

**Set all** keys in the database
``db.setAll({ "key": "value" }).then(all => {});``

**Delete multiple** keys
``db.deleteMultiple([ "key1", "key2" ]).then(() => {});``
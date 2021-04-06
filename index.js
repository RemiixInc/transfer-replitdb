const fs = require("fs");
const fetch = require("node-fetch");
const filename = "./db.json";

class Client {
  /**
   * Gets a key
   * @param {String} key Key
   */
  async get(key) {
    if (typeof key !== "string")
      throw new TypeError("Key argument must be of type string!");
    return await JSON.parse(fs.readFileSync(filename))[key];
  }

  /**
   * Sets a key
   * @param {String} key Key
   * @param {any} value Value
   */
  async set(key, value) {
    if (typeof key !== "string")
      throw new TypeError("Key argument must be of type string!");
    let db = await JSON.parse(fs.readFileSync(filename));
    db[key] = value;
    return await fs.writeFileSync(filename, JSON.stringify(db), "utf8");
  }

  /**
   * Deletes a key
   * @param {String} key Key
   */
  async delete(key) {
    if (typeof key !== "string")
      throw new TypeError("Key argument must be of type string!");
    let db = await JSON.parse(fs.readFileSync(filename));
    delete db[key];
    return await fs.writeFileSync(filename, JSON.stringify(db), "utf8");
  }

  /**
   * List key starting with a prefix or list all.
   * @param {String} prefix Filter keys starting with prefix.
   */
  async list(prefix) {
    if (typeof prefix !== "string")
      throw new TypeError("Prefix argument must be of type string!");
    let db = await JSON.parse(fs.readFileSync(filename));
    let keys = Object.keys(db);
    if (!prefix) return keys;
    return keys.filter((item) => item.startsWith(prefix));
  }

  /**
   * Clears the database.
   */
  async empty() {
    return await fs.writeFileSync(filename, JSON.stringify({}), "utf8");
  }

  /**
   * Get all key/value pairs and return as an object
   */
  async getAll() {
    return await JSON.parse(fs.readFileSync(filename));
  }

  /**
   * Sets the entire database through an object.
   * @param {Object} obj The object.
   */
  async setAll(obj) {
    if (typeof obj !== "object")
      throw new TypeError("Arguments must be of type object!");
    return await fs.writeFileSync(filename, JSON.stringify(obj), "utf8");
  }

  /**
   * Delete multiple entries by keys
   * @param {Array<string>} args Keys
   */
  async deleteMultiple(args) {
    if (typeof args !== "array")
      throw new TypeError("Keys argument must be of type array!");
    let db = await JSON.parse(fs.readFileSync(filename));
    for (const arg of args) {
      delete db[arg];
    }
    return await fs.writeFileSync(filename, JSON.stringify(db), "utf8");
  }
  
  /**
   * Import data from ReplitDB
   * @param {String} url ReplitDB URL
   */
  async import(url) {
    if (typeof url !== "string")
      throw new TypeError("URL argument must be of type string!");
    let output = {};
    let keys = await fetch(`${url}?prefix`);
    keys = await keys.text();
    for (const key of await keys.split("\n")) {
      let value = await fetch(`${url}/${key}`);
      value = value.text();
      output[key] = await value;
    }
    return await fs.writeFileSync(filename, JSON.stringify(output), "utf8");
  }
}

module.exports = Client;

const sqlite3 = require('better-sqlite3');

const db = sqlite3('storage.db');

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 15000');
db.pragma('synchronous = NORMAL');

db.prepare(`CREATE TABLE IF NOT EXISTS kvs (key PRIMARY KEY, value)`).run();

const read = key => {
    return db.prepare(`SELECT value FROM kvs WHERE key = ?`).get(key);
};
const readString = read;
const readPrefix = keyPrefix => {
    return db.prepare(`SELECT value FROM kvs WHERE key LIKE ?`).get(`${keyPrefix}%`);
};
const readNumber = key => {
    return Number(read(key));
};
const readJSON = key => {
    const v = read(key);
    try {
        return JSON.parse(v);
    } catch (error) {
        throw new Error(`Value "${v}" stored in key ${key} isn't valid JSON!`);
    }
};
const readBool = key => {
    const v = read(key);
    const truthy = ['1', 'true'];
    const falsy = ['0', 'false'];
    if (truthy.includes(v)) return true;
    else if (falsy.includes(v)) return false;
    throw new Error(`Value "${v}" stored in key ${key} isn't a valid boolean!`);
};
const readDate = key => {
    return new Date(read(key));
};
const keyExists = key => {
    return !!read(key);
};

const write = (key, value = null) => {
    let valueFinal = value;
    switch (typeof value) {
        case 'object':
        case 'array': {
            valueFinal = JSON.stringify(value);
            break;
        }
        default: {
            valueFinal = value.toString();
            break;
        }
    }
    db.prepare(`INSERT OR REPLACE INTO kvs (key, value) VALUES (?, ?)`).run(key, valueFinal);
};

module.exports = {
    read,
    readString,
    readPrefix,
    keyExists,
    readNumber,
    readJSON,
    readDate,
    readBool,
    write,
    db
};

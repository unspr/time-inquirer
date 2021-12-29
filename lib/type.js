const DB = require('../lib/db');
const typeCol = DB.get('type');

class Type {
    static get(idx) {
        const types = typeCol.find({});
        types.push('new type');
        return types[idx];
    }

    static add(type) {
        typeCol.insert(type);
    }
}

module.exports = Type;

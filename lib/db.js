const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class DB {
    static get(colName) {
        const filePath = path.join(__dirname, `../${colName}.json`);
        if (!fs.existsSync(filePath)) {
            return new Col(filePath, []);
        }

        const rawData = fs.readFileSync(filePath);
        return new Col(filePath, JSON.parse(rawData));
    }
}

class Col {
    constructor(path, col) {
        this.path = path;
        this.col = col;
    }

    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.col));
    }

    findRecord(filter) {
        return _.find(this.col, filter);
    }

    insert(record) {
        this.col.push(_.cloneDeep(record));
        this.save();
        return _.cloneDeep(record);
    }

    del(filter) {
        _.remove(this.col, filter);
        this.save();
    }

    findOne(filter) {
        const res = this.findRecord(filter);
        return res ? _.cloneDeep(res) : null;
    }

    find(filter) {
        const res = _.filter(this.col, filter);
        return _.map(res, _.cloneDeep);
    }

    update(filter, obj) {
        const res = this.findRecord(filter);
        assert(res, 'no record found');

        const {
            $set: setObj,
            $push: pushObj,
        } = obj;
        _.assign(res, obj);
        this.save();
    }
}

module.exports = DB;

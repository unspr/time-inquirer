const R = require('ramda');
const Interval = require('./interval');
const DB = require('../lib/db');
const dayCol = DB.get('day');
const _ = require('lodash');

class Day {
    static init(date) {
        const day = dayCol.findOne({ date });
        if (_.isEmpty(day)) {
            return day;
        }

        return dayCol.insert({
            date,
            intervals: [Interval.get(moment().startOf('day').add(9, 'hours'), 'N/A')],
        });
    }

    static addInterval(type, date) {
        const day = dayCol.findOne({ date });

        dayCol.update({ date }, Interval.get(Interval.getStartTime(updatedInterval), type));

        const updatedInterval = R.last(day);
        const othersInterval = R.init(day);
        return [
            ...othersInterval,
            Interval.get(Interval.getStartTime(updatedInterval), type)
        ];
    }

    static show(day) {
        const intervalSpans = R.zipWith((i, j) =>
            Interval.getStartTime(i) - Interval.getStartTime(j),
            R.tail(day), day);
        const intervals = R.zipWith((interval, span) => ({
            ...interval,
            span,
        }) , day, intervalSpans);
        const res = R.reduce((acc, interval) => {
            const type = Interval.getType(interval);
            return {
              ...acc,
              [type]: (acc[type] || 0) + interval.span,
            };
        }, {}, intervals);
        console.log(res);
    }
}

module.exports = Day;

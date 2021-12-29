const moment = require('moment-timezone');

class Interval {
  static get(startTime, type) {
    return { startTime, type };
  }

  static getType(interval) {
    return interval.type;
  }

  static getStartTime(interval) {
    return interval.startTime;
  }

  static updateType(type, interval) {
    return {
      startTime: Interval.getStartTime(interval),
      type,
    };
  }

  static getNowInterval() {
    return Interval.get(moment().unix(), 'N/A');
  }
}

module.exports = Interval;

/** @format */

let moment = require(`moment`);

module.exports = {
  formatted_date: date => {
    return moment(date).format(`l`);
  },
  lowercase: str => {
    return `${str}`.toLowerCase();
  },
};

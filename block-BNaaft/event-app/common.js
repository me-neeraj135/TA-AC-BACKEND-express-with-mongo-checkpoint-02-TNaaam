/** @format */

let moment = require(`moment`);

module.exports = {
  formatted_date: date => {
    return moment(date).format("YYYY-MM-DD");
  },
  lowercase: str => {
    return `${str}`.toLowerCase();
  },
};

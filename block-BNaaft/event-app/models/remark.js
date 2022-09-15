/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let remarkSchema = new Schema({
  name: { type: String },
  remark: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },

  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

let Remark = mongoose.model(`Remark`, remarkSchema);
module.exports = Remark;

/** @format */

let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let eventSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String },
    host: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    categories: [{ type: String, required: true }],
    location: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    remarks: [{ type: Schema.Types.ObjectId, ref: "Remark" }],
  },
  { timestamps: true }
);

let Event = mongoose.model(`Event`, eventSchema);
module.exports = Event;

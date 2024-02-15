// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: {
    type: String,
    default: new Date().toISOString(),
  },
  bonuses: [
    {
      value :  Number,
      createdAt: { type: Date, default: new Date().toISOString() },
    },
  ],
  equipments: [
    {
      name :  String,
      createdAt: { type: Date, default: new Date().toISOString()},
      returnedAt: { type: Date},
    },
  ],
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: "FavoriteBrand",
  },
  experience:{
    type: Number,
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);

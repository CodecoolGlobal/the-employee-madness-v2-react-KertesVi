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
      value: Number,
      createdAt: { type: Date, default: new Date().toISOString() },
    },
  ],
  equipments: [
    {
      name: String,
      createdAt: { type: Date, default: new Date().toISOString() },
    },
  ],
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: "FavoriteBrand",
  },
  color: String,
  startingDate: Date,
  salary: Number,
  desiredSalary: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);

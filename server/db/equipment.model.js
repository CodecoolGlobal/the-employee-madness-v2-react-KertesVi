const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    name:{type: String},
    type:{type: String},
    amount:{type: Number},
    createdAt:{type: Date, default: Date.now()},
})
module.exports = mongoose.model("Equipment", EquipmentSchema);
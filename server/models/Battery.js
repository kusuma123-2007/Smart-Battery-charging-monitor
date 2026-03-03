const mongoose = require("mongoose");

const BatterySchema = new mongoose.Schema({
    batteryLevel: Number,
    chargingStatus: Boolean,
    time: Date
});

module.exports = mongoose.model("Battery", BatterySchema);
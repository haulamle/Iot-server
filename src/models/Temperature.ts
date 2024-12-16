import mongoose from "mongoose";

const TemperatureSchema = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  Temperatured: {
    type: String,
    required: true,
  },
  DateTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const TemperatureModel = mongoose.model("temperatures", TemperatureSchema);
export default TemperatureModel;

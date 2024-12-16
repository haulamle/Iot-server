"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TemperatureSchema = new mongoose_1.default.Schema({
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
const TemperatureModel = mongoose_1.default.model("temperatures", TemperatureSchema);
exports.default = TemperatureModel;
//# sourceMappingURL=Temperature.js.map
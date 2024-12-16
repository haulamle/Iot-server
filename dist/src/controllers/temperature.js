"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemperature = exports.AddTemperature = void 0;
const Temperature_1 = __importDefault(require("../models/Temperature"));
const AddTemperature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { DeviceID } = body;
    try {
        const newTemperature = new Temperature_1.default(body);
        yield newTemperature.save();
        res.status(200).json({
            data: newTemperature,
            message: "add temperature successfully!!!",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.AddTemperature = AddTemperature;
const getTemperature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize } = req.query;
    try {
        const skip = (Number(page) - 1) * Number(pageSize);
        const total = yield Temperature_1.default.countDocuments();
        const temperature = yield Temperature_1.default.find()
            .skip(skip)
            .limit(Number(pageSize));
        res.status(200).json({
            data: {
                temperature,
                totalItem: total,
            },
            message: "get temperature successfully!!!",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getTemperature = getTemperature;
//# sourceMappingURL=temperature.js.map
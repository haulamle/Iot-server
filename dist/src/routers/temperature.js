"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temperature_1 = require("../controllers/temperature");
const router = (0, express_1.Router)();
router.post("/add-new", temperature_1.AddTemperature);
router.get("/get-temperature", temperature_1.getTemperature);
exports.default = router;
//# sourceMappingURL=temperature.js.map
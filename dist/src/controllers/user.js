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
exports.refreshToken = exports.login = void 0;
const bcrypt = require("bcryptjs");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const getAccesstoken_1 = require("../utils/getAccesstoken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const { username, password } = body;
    try {
        const user = yield UserModel_1.default.findOne({ username });
        if (!user) {
            throw new Error(`Tài khoản không tồn tại`);
        }
        const isMatchPassword = yield bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            throw new Error("Đăng nhập thất bại, vui lòng kiểm tra lại username/Password và thử lại");
        }
        delete user._doc.password;
        res.status(200).json({
            message: "Login successfuly!!!",
            data: Object.assign(Object.assign({}, user._doc), { token: yield (0, getAccesstoken_1.getAccesstoken)({
                    _id: user._id,
                    username: user.username,
                }) }),
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const user = yield UserModel_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const token = yield (0, getAccesstoken_1.getAccesstoken)({
            _id: id,
            username: user.username,
        });
        res.status(200).json({
            message: "Get token successfully!!!",
            data: token,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=user.js.map
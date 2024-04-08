"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_INTERFOOD,
        pass: process.env.PASSWORD_INTERFOOD,
    },
});

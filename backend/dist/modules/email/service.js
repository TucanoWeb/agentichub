"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../config/env");
async function sendEmail(input) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: env_1.env.gmail.user,
            clientId: env_1.env.gmail.clientId,
            clientSecret: env_1.env.gmail.clientSecret,
            refreshToken: env_1.env.gmail.refreshToken
        }
    });
    return transporter.sendMail({
        from: env_1.env.gmail.user,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html: input.html
    });
}

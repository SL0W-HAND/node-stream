"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
let secret = crypto_1.default.randomBytes(64).toString('hex');
console.log('you can use this string to sign your tokens:');
console.log('');
console.log('\x1b[32m%s\x1b[0m', secret);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./config/index"));
const app = require('./app');
app.listen(index_1.default.port, () => {
    console.log(`server runing on port ${index_1.default.port}`);
});

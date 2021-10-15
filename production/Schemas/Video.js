"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VideoSchema = new mongoose_1.Schema({
    //id: {type: Number, required: true},
    name: { type: String, required: true },
    duration: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('Video', VideoSchema);

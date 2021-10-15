"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PageSchema = new mongoose_1.Schema({
    page: {
        type: Number,
        required: true,
    },
    total_pages: {
        type: Number,
        required: true,
    },
    videos: {
        type: Array,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Page', PageSchema);

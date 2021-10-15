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
exports.randomVideo = exports.recomendVideos = exports.searchResuts = exports.searchVideos = exports.videoPoster = exports.video = exports.videoData = exports.pageVideos = void 0;
const index_1 = __importDefault(require("../config/index"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = require("mongoose");
const Video_1 = __importDefault(require("../Schemas/Video"));
const Pages_1 = __importDefault(require("../Schemas/Pages"));
try {
    (0, mongoose_1.connect)('mongodb://localhost:27017/videodb');
    console.log('connected to mongodb');
}
catch (error) {
    console.log(error);
    console.log('error connecting to mongodb');
    process.exit(1);
}
const thumbsupply = require('thumbsupply');
const pageVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //fix for mongo db
    if (!parseInt(req.params.page)) {
        return res.json('bad request');
    }
    const page = yield Pages_1.default.findOne({ page: parseInt(req.params.page) });
    if (page == null) {
        return res.json('bad request');
    }
    return res.json(page);
});
exports.pageVideos = pageVideos;
const videoData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const data = await db.getById(req.params.id);
    if (!parseInt(req.params.id)) {
        return res.json('bad request');
    }
    try {
        const data = yield Video_1.default.findOne({ _id: req.params.id });
        if (data == null) {
            return res.json(null);
        }
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.json(null);
    }
});
exports.videoData = videoData;
const video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoData = yield Video_1.default.findOne({ _id: req.params.id });
        const pathVideo = `${index_1.default.folderPath}/${videoData === null || videoData === void 0 ? void 0 : videoData.name}`;
        const stat = fs_1.default.statSync(pathVideo);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const file = fs_1.default.createReadStream(pathVideo, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        }
        else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs_1.default.createReadStream(pathVideo).pipe(res);
        }
    }
    catch (error) {
        res.status(404).json(null);
    }
});
exports.video = video;
const videoPoster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield yield Video_1.default.findOne({ _id: req.params.id });
        thumbsupply
            .generateThumbnail(`${index_1.default.folderPath}/${video.name}`)
            .then((thumb) => {
            return res.sendFile(thumb);
        });
    }
    catch (_a) {
        res.status(404).json(null);
    }
});
exports.videoPoster = videoPoster;
const searchVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield Video_1.default.find({
        name: { $regex: req.params.query, $options: 'i' },
    })
        .sort({ _id: -1 })
        .limit(10);
    return res.json(results);
});
exports.searchVideos = searchVideos;
const searchResuts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield Video_1.default.find({
        name: { $regex: req.params.query, $options: 'i' },
    })
        .sort({ _id: -1 })
        .limit(100);
    if (results.length == 0) {
        return res.json([]);
    }
    const total_pages = Math.ceil(results.length / 10);
    let pages = [];
    //chunck the results in gorups of 10 and push them into pages
    for (let i = 0; i < total_pages; i++) {
        pages.push({
            page: i + 1,
            total_pages: total_pages,
            videos: results.slice(i * 10, (i + 1) * 10),
        });
    }
    return res.json(pages[0].videos);
});
exports.searchResuts = searchResuts;
const recomendVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get a array of max 10 videos without the video that is being requested
    try {
        const randomVideos = yield Video_1.default.find({
            _id: { $ne: req.params.id },
        })
            .sort({ _id: -1 })
            .limit(10);
        return res.json(randomVideos);
    }
    catch (_b) {
        return res.status(404).json(null);
    }
});
exports.recomendVideos = recomendVideos;
const randomVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //works from test but need to be fixed
    const video = yield Video_1.default.findOne({}).sort({ _id: -1 });
    return res.json(video);
});
exports.randomVideo = randomVideo;

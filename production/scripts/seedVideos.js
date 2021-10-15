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
const mongoose_1 = require("mongoose");
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../config/index"));
const path_1 = __importDefault(require("path"));
const get_video_duration_1 = require("get-video-duration");
//Schemas
const Video_1 = __importDefault(require("../Schemas/Video"));
run().catch((err) => console.log(err));
function getDuration(path) {
    (0, get_video_duration_1.getVideoDurationInSeconds)(path).then((duration) => {
        return duration;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/videodb');
        fs_1.default.readdir(index_1.default.folderPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach((file) => {
                if (file.includes('.mp4')) {
                    let videoPath = path_1.default.join(index_1.default.folderPath, file);
                    (0, get_video_duration_1.getVideoDurationInSeconds)(videoPath)
                        .then((duration) => __awaiter(this, void 0, void 0, function* () {
                        const SingleVideo = new Video_1.default({
                            name: file,
                            duration: duration,
                        });
                        yield SingleVideo.save();
                    }))
                        .then(() => {
                        //if is the last file exit
                        if (files.length === files.indexOf(file) + 1) {
                            console.log('All videos saved');
                            process.exit(1);
                        }
                    });
                }
            });
        });
    });
}

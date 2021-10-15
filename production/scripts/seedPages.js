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
//Schemas
const Video_1 = __importDefault(require("../Schemas/Video"));
const Pages_1 = __importDefault(require("../Schemas/Pages"));
function chunkArray(myArray, chunk_size) {
    return __awaiter(this, void 0, void 0, function* () {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        let pageNumber = 1;
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            let page = {
                page: pageNumber,
                total_pages: Math.ceil(arrayLength / chunk_size),
                videos: myChunk,
            };
            let newPage = new Pages_1.default(page);
            yield newPage.save();
            pageNumber++;
            tempArray.push(page);
        }
        console.log('done');
        process.exit(1);
    });
}
run().catch((err) => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/videodb');
        console.log('seeding data');
        const allVideos = yield Video_1.default.find({});
        chunkArray(allVideos, 10);
    });
}

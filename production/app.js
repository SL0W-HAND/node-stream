"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./config/index"));
const passportMid_1 = __importDefault(require("./utils/middlewares/passportMid"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
//import routes
const videos_1 = __importDefault(require("./routes/videos"));
const secret = index_1.default.jwtSecret;
let dev;
if (index_1.default.dev == 'true') {
    dev = true;
}
else {
    dev = false;
}
function createToken() {
    return jsonwebtoken_1.default.sign({ auth: true }, secret, { expiresIn: '600s' });
}
const app = (0, express_1.default)();
//settings
app.set('port', index_1.default.port);
//middlewares
app.use((0, cors_1.default)({
    origin: dev,
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
passport_1.default.use(passportMid_1.default);
app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`);
});
//Routes
app.use(videos_1.default);
app.post('/login', (req, res, next) => {
    if (!req.body.password) {
        res.cookie('token', { maxAge: 0 })
            .status(400)
            .json({ msg: 'Please. Send your password' });
    }
    const isMatch = () => {
        if (req.body.password === index_1.default.user.password) {
            return true;
        }
        else {
            return false;
        }
    };
    if (isMatch()) {
        let token = createToken();
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 15,
        }).json({
            auth: true,
        });
    }
    else {
        res.cookie('token', { maxAge: 0 }).status(400).json({
            msg: 'The password are incorrect',
            auth: false,
        });
    }
    next();
});
app.get('/refresh_token', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    let token = createToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 15,
    })
        .json({
        auth: true,
    })
        .status(200);
    next();
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
//export default app
module.exports = app;

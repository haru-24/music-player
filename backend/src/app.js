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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const lyrics_finder_1 = __importDefault(require("lyrics-finder"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotify_web_api_node_1.default({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: "http://localhost:3000",
    });
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            exporesIn: data.body.expires_in,
        });
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotify_web_api_node_1.default({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: "http://localhost:3000",
        refreshToken,
    });
    spotifyApi
        .refreshAccessToken()
        .then((data) => {
        res.json({
            accCessToken: data.body.access_token,
            exporesIn: data.body.expires_in,
        });
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
app.get("/lyrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("通信したよ");
    const lyrics = (yield (0, lyrics_finder_1.default)(req.body.artist, req.query.track)) ||
        "No Lyricks Found";
    res.json({ lyrics });
}));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server Run PORT", PORT);
});

import express from "express";
import cors from "cors";
require("dotenv").config();
import SpotifyWebApi from "spotify-web-api-node";
import songs from "@allvaa/get-lyrics";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
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
  const spotifyApi = new SpotifyWebApi({
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

app.get("/lyrics", async (req, res) => {
  const title = req.query.track as string;
  const result = await songs(title);
  const lyrics = result?.geniusUrl;
  if (!lyrics) {
    res.json({ lyrics: " No Lyric Found " });
  } else {
    res.json({ lyrics });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server Run PORT", PORT);
});

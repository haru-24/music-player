import React, { ChangeEvent, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { TrackSearchResult } from "./TrackSearchResult";
import { Player } from "./Player";
import axios from "axios";

interface Props {
  code: string | null;
}

export interface ResponseTrackData {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
});

export const Dashbord = (props: Props) => {
  const { code } = props;
  const accessToken = useAuth(code);
  const [search, setsearch] = useState("");
  const [searchResult, setSearchResult] = useState<ResponseTrackData[]>([]);
  const [palyingTrack, setPlayingTrack] = useState<ResponseTrackData>();
  const [lyrics, setLyrics] = useState("");

  const chooseTrack = (track: ResponseTrackData) => {
    setPlayingTrack(track);
    setsearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!palyingTrack) return;
    axios
      .get("http://localhost:8000", {
        params: {
          track: palyingTrack.title,
          aritist: palyingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrick);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [palyingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;
    // トラックデータ取得
    spotifyApi.search
      .searchTracks(search)
      .then((res) => {
        setSearchResult(
          res.items.map((track) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[2].url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, accessToken]);

  return (
    <Container>
      <Form.Control
        type="search"
        placeholder="search Songs / Artists"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setsearch(e.target.value)
        }
      />
      {/* <button onClick={searchTracks}>検索</button> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResult.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResult.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accsessToken={accessToken} trackUri={palyingTrack?.uri} />
      </div>
    </Container>
  );
};

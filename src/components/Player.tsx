import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

interface Props {
  accsessToken: string | undefined;
  trackUri: string | undefined;
}

export const Player = (props: Props) => {
  const { accsessToken, trackUri } = props;
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);
  if (!accsessToken) return null;
  return (
    <SpotifyPlayer
      token={accsessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};

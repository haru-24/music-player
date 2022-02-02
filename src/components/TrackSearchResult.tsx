import React from "react";
import { ResponseTrackData } from "./Dashbord";

interface Props {
  track: ResponseTrackData;
  chooseTrack: any;
}

export const TrackSearchResult = (props: Props) => {
  const { track, chooseTrack } = props;

  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <>
      <div
        className="d-flex m-2 align-items-center"
        style={{
          cursor: "pointer",
          display: "flex",
          margin: "10px",
          borderBottom: "solid 1px gray",
        }}
        onClick={handlePlay}
      >
        <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
        <div
          style={{
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <div style={{ color: "gray" }}>{track.title}</div>
          <div> {track.artist}</div>
        </div>
      </div>
    </>
  );
};

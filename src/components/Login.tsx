import React from "react";
import { accessUrl } from "../config/Spotify";

export const Login = () => {
  return (
    <div className="Login">
      <a href={accessUrl}>spotifyへログイン</a>
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";

interface ResponseTokenData {
  accessToken: string;
  refreshToken: string;
  exporesIn: string;
}

export const useAuth = (code: null | string) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  useEffect(() => {
    axios
      .post<ResponseTokenData>("http://localhost:8000/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.exporesIn);
        window.history.pushState({}, null as any, "/");
      })
      .catch((err) => {});
  }, [code]);
};

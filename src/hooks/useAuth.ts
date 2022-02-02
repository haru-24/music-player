import axios from "axios";
import React, { useEffect, useState } from "react";

interface ResponseTokenData {
  accessToken: string;
  refreshToken: string;
  exporesIn: number | null;
}

export const useAuth = (code: null | string) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

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
      .catch((err) => {
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }
    const interval = setInterval(() => {
      axios
        .post<ResponseTokenData>("http://localhost:8000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.exporesIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  return accessToken;
};

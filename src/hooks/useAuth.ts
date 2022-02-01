import axios from "axios";
import React, { useEffect, useState } from "react";
interface Props {
  code: string;
}

export const useAuth = (props: Props) => {
  const { code } = props;
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8000/login", {
        code,
      })
      .then((res) => {
        console.log(res);
        window.history.pushState({}, null as any, "/");
      })
      .catch((err) => {});
  }, [code]);
};

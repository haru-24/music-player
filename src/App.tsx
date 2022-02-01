import React from "react";
import { Login } from "./components/Login";
import { Dashbord } from "./components/Dashbord";
import { tokenFromUrl } from "./config/Spotify";
import { useAuth } from "./hooks/useAuth";

const code = tokenFromUrl().access_token;
export const App = () => {
  const accessToken = useAuth(code);

  return code ? <Dashbord code={code} /> : <Login />;
};

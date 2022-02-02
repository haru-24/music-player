import React, { useEffect, useState } from "react";
import { Login } from "./components/Login";
import { Dashbord } from "./components/Dashbord";

import { useAuth } from "./hooks/useAuth";

const code = new URLSearchParams(window.location.search).get("code");

export const App = () => {
  return code ? <Dashbord code={code} /> : <Login />;
};

import { Login } from "./components/Login";
import { Dashbord } from "./components/Dashbord";

const code = new URLSearchParams(window.location.search).get("code");

export const App = () => {
  return code ? <Dashbord code={code} /> : <Login />;
};

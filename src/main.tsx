import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import { routes } from "./util/router";

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <App router={router} />
);

import { setupWorker } from "msw/browser";
import ReactDOM from "react-dom/client";
import { handlers } from "../msw/handlers";
import { App } from "./App";
import "./index.css";

setupWorker(...handlers)
  .start()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  });

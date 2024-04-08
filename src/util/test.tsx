import { render } from "@testing-library/react";
import { createMemoryRouter } from "react-router-dom";
import { App } from "../App";
import { routes } from "./router";

export const renderApp = (opts?: { url: string }) => {
  const testRouter = createMemoryRouter(routes, {
    initialEntries: [opts?.url ?? "/"],
  });
  return render(<App router={testRouter} />);
};

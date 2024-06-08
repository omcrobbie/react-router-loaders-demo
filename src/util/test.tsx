import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import _userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import {
  Location,
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";
import Root from "../routes/root";
import { queryClient } from "./client";
import { getRoutes } from "./router";

export const renderApp = (opts?: { url: string }) => {
  const location: { current: Location; history: string[] } = {
    current: {
      state: undefined,
      key: "",
      pathname: "",
      search: "",
      hash: "",
    },
    history: [],
  };

  const TestRoot = () => {
    const _location = useLocation();

    useEffect(() => {
      location.current = _location;
      if (_location.pathname) {
        location.history.push(_location.pathname);
      }
    }, [_location, _location.pathname]);

    return <Root />;
  };
  const testRouter = createMemoryRouter(getRoutes(TestRoot), {
    initialEntries: [opts?.url ?? "/"],
  });

  const renderData = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={testRouter} />
    </QueryClientProvider>
  );

  return {
    ...renderData,
    location,
    userEvent: _userEvent.setup(),
  };
};

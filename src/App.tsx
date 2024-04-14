import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import { queryClient } from "./util/client";
import { getRoutes } from "./util/router";

const router = createBrowserRouter(getRoutes(Root));
export function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

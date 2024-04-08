import { Router } from "@remix-run/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./util/functions";

export function App(props: { router: Router }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={props.router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

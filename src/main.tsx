import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Index from "./routes";
import Contact from "./routes/contact";
import EditContact from "./routes/edit";
import Root from "./routes/root";
import {
  contactAction,
  contactLoader,
  contactsLoader,
  deleteAction,
  editAction,
  favoriteAction,
  queryClient,
} from "./util/functions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
      loader={contactsLoader}
      action={contactAction}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          errorElement={<ErrorPage />}
          path="/contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={favoriteAction}
        />
        <Route
          path="/contacts/:contactId/edit"
          element={<EditContact />}
          action={editAction}
          loader={contactLoader}
        />
        <Route
          path="/contacts/:contactId/destroy"
          action={deleteAction}
          errorElement={<div>Oops! There was an error.</div>}
        />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

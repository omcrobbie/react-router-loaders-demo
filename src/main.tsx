import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
} from "./util/functions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: contactsLoader,
    action: contactAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: favoriteAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            action: editAction,
            loader: contactLoader,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: deleteAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

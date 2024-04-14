import { createRoutesFromElements, Route } from "react-router-dom";
import ErrorPage from "../error-page";
import Index from "../routes";
import Contact from "../routes/contact";
import EditContact from "../routes/edit";
import {
  contactAction,
  contactLoader,
  contactsLoader,
  deleteAction,
  editAction,
  favoriteAction,
} from "./functions";

export const getRoutes = (Root: () => JSX.Element) =>
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
  );

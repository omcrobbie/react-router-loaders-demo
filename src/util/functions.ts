import { QueryClient } from "@tanstack/react-query";
import { ActionFunction, LoaderFunction, redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";
import { deferredLoader } from "./helpers";
import { contactQueryOptions, contactsQueryOptions } from "./queries";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const contactLoader = (({ params }) => {
  return queryClient.ensureQueryData(contactQueryOptions(params.contactId!));
}) satisfies LoaderFunction;

export const contactsLoader = deferredLoader(({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const options = contactsQueryOptions(q);
  return {
    contacts: queryClient.ensureQueryData(options),
  };
});

export const contactAction: ActionFunction = async () => {
  await queryClient.invalidateQueries({ queryKey: ["contacts"] });
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const editAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId!, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export const favoriteAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  return updateContact(params.contactId!, {
    favorite: formData.get("favorite") === "true",
  });
};

export const deleteAction: ActionFunction = async ({ params }) => {
  await deleteContact(params.contactId!);
  return redirect("/");
};

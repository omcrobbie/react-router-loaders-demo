import { ActionFunction, LoaderFunction, redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";
import { queryClient } from "./client";
import { contactQueryOptions, contactsQueryOptions } from "./queries";

const removeQueries = () => {
  queryClient.removeQueries({ queryKey: ["contact"] });
  queryClient.removeQueries({ queryKey: ["contacts"] });
};

export const contactLoader = (({ params }) => {
  return queryClient.ensureQueryData(contactQueryOptions(params.contactId!));
}) satisfies LoaderFunction;

export const contactsLoader = (({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const options = contactsQueryOptions(q);
  return queryClient.ensureQueryData(options);
}) satisfies LoaderFunction;

export const contactAction: ActionFunction = async () => {
  removeQueries();
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const editAction: ActionFunction = async ({ request, params }) => {
  removeQueries();
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId!, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export const favoriteAction: ActionFunction = async ({ request, params }) => {
  removeQueries();
  const formData = await request.formData();
  return updateContact(params.contactId!, {
    favorite: formData.get("favorite") === "true",
  });
};

export const deleteAction: ActionFunction = async ({ params }) => {
  removeQueries();
  await deleteContact(params.contactId!);
  return redirect("/");
};

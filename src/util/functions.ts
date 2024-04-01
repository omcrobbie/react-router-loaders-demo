import { ActionFunction, LoaderFunction, redirect } from "react-router-dom";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../contacts";

export const contactLoader = (async ({ params }) => {
  const contact = await getContact(params.contactId!);
  if (!contact)
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  return { contact };
}) satisfies LoaderFunction;

export const contactsLoader = (async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}) satisfies LoaderFunction;

export const contactAction: ActionFunction = async () => {
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

import { HttpResponse } from "msw";
import { ContactType } from "../src/util/types";
import { contacts } from "./data";
import { createHandler } from "./helpers";

const created: ContactType[] = [];

export const getContacts = createHandler("/contacts", "get", () =>
  HttpResponse.json([...created, ...contacts])
);

export const getContact = createHandler(
  "/contacts/:id",
  "get",
  ({ params }) => {
    const contact = contacts.find((c) => c.id === params.id);
    if (contact) {
      return HttpResponse.json(contact);
    }
    return new HttpResponse(null, {
      status: 404,
    });
  }
);

export const createContact = createHandler(
  "/contacts",
  "post",
  async ({ request }) => {
    const contact = await request.json();
    created.push(contact as ContactType);
    return new HttpResponse(null, { status: 201 });
  }
);

export const handlers = [getContacts(), getContact(), createContact()];

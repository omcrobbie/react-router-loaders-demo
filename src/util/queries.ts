import { queryOptions } from "@tanstack/react-query";
import { getContact, getContacts } from "../contacts";

export const contactsQueryOptions = (q: string | null) =>
  queryOptions({
    queryKey: ["contacts", q],
    queryFn: () => getContacts(q),
  });

export const contactQueryOptions = (contactId: string) =>
  queryOptions({
    queryKey: ["contact", contactId],
    queryFn: async () => {
      const contact = await getContact(contactId);
      if (!contact)
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      return contact;
    },
  });

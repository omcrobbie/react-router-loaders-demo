import { faker } from "@faker-js/faker";
import axios from "axios";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactType } from "./util/types";

export async function getContacts(query: string | null) {
  let contacts = await (await axios.get<ContactType[]>("/contacts")).data;
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  const id = Math.random().toString(36).substring(2, 9);
  const contacts = await getContacts(null);
  const contact: ContactType = {
    id,
    createdAt: Date.now(),
    avatar: `https://picsum.photos/id/${Math.round(
      Math.random() * 100
    )}/200/200`,
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    twitter: faker.internet.url(),
    notes: "",
    favorite: false,
  };
  await axios.post("/contacts", contact);
  contacts.unshift(contact);
  return contact;
}
export async function getContact(id: string) {
  const contacts = await getContacts(null);
  if (!contacts) return null;
  return contacts.find((contact) => contact.id === id);
}

export async function updateContact(id: string, updates: Partial<ContactType>) {
  const contacts = await getContacts(null);
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for " + id);
  Object.assign(contact, updates);
  return contact;
}

export async function deleteContact(id: string) {
  const contacts = await getContacts(null);
  if (!contacts) return false;
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    return true;
  }
  return false;
}

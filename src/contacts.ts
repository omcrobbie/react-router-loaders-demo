import { faker } from "@faker-js/faker";
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactType } from "./util/types";

export async function getContacts(query: string | null) {
  await fakeNetwork(`getContacts:${query ?? ""}`);
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
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
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) return null;
  return contacts.find((contact) => contact.id === id);
}

export async function updateContact(id: string, updates: Partial<ContactType>) {
  await fakeNetwork();
  const contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) throw new Error("No contacts found");
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for " + id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  const contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) return false;
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: ContactType[]) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {};
  }
  if (key && fakeCache[key]) {
    return;
  } else if (key && !fakeCache[key]) {
    fakeCache[key] = true;
    return new Promise((res) => {
      setTimeout(res, 300);
    });
  }
}

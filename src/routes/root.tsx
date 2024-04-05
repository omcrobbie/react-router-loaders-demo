import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useNavigate,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { contactsLoader } from "../util/functions";
import { useTypedAsyncValue } from "../util/helpers";

function Root() {
  const { contacts } = useLoaderData<typeof contactsLoader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const isSearching = searchParams.has("q") && navigation.location;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = q ?? "";
    }
    if (inputRef.current && !q && searchParams.has("q")) {
      setSearchParams({});
    }
  }, [navigate, q, searchParams, setSearchParams]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              className={isSearching ? "loading" : ""}
              name="q"
              defaultValue={q ?? ""}
              ref={inputRef}
              onChange={(event) => {
                submit(event.currentTarget.form, { replace: !!q });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!isSearching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={contacts}>
            <ContactsList q={q} />
          </Await>
        </Suspense>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

const ContactsList = (props: { q: string | null }) => {
  const { q } = props;
  const contacts = useTypedAsyncValue<typeof contactsLoader, "contacts">();
  return (
    <nav>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <NavLink
                to={
                  q ? `contacts/${contact.id}?q=${q}` : `contacts/${contact.id}`
                }
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{" "}
                {contact.favorite && <span>★</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts found</i>
        </p>
      )}
    </nav>
  );
};
export default Root;

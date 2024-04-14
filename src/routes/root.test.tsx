import { screen, waitFor } from "@testing-library/react";
import { renderApp } from "../util/test";

vi.mock("localforage");
test("root - renders list of contacts", async () => {
  const { container, location, userEvent } = renderApp();
  await screen.findByTestId("contacts-list");
  expect(container).toMatchSnapshot();
  await userEvent.click(screen.getByTestId("contact-item-jb6bezu"));
  await waitFor(() =>
    expect(location.current.pathname).toBe("/contacts/jb6bezu")
  );
});

test("root - creates a new contact", async () => {
  const { userEvent } = renderApp();
  const elems = await screen.findAllByTestId(/contact-item/);
  expect(elems).toHaveLength(11);
  await userEvent.click(screen.getByText("New"));
  await waitFor(() =>
    expect(screen.getAllByTestId(/contact-item/)).toHaveLength(12)
  );
});

import { screen, waitFor } from "@testing-library/react";
import { renderApp } from "../util/test";

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
  const { userEvent, location } = renderApp();
  const elems = await screen.findAllByRole("listitem");
  expect(elems).toHaveLength(11);
  await userEvent.click(screen.getByText("New"));

  await waitFor(() => {
    expect(location.history).toHaveLength(2);
  });
  expect(screen.getAllByRole("listitem")).toHaveLength(12);
});

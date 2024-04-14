import { screen, waitFor } from "@testing-library/react";
import { renderApp } from "../util/test";

vi.mock("localforage");
test("Contact - should render the correct contact", async () => {
  const { location, userEvent } = renderApp({ url: "/contacts/jb6bezu" });
  await screen.findByText("https://honorable-machinery.org/");
  await userEvent.click(screen.getByText("Edit"));
  await waitFor(() =>
    expect(location.current.pathname).toBe("/contacts/jb6bezu/edit")
  );
});

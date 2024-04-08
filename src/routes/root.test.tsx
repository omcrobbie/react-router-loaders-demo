import { screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { debug } from "vitest-preview";
import { renderApp } from "../util/test";

vi.mock("localforage");
test("root - renders list of contacts", async () => {
  const { container } = renderApp();
  await screen.findByTestId("contacts-list");
  debug();
  expect(container).toMatchSnapshot();
});

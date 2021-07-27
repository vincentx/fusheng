import App from "./App";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as React from "react";

describe("Fusheng test", () => {
  it("should display sidebar a list of all reports", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("sidebar-spec1")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("sidebar-spec2")).toBeInTheDocument();
    });
  });

  it("should in view mode initially", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("sidebar-spec1")).toBeInTheDocument();
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("sidebar-spec1"));
    });
    await waitFor(() => {
      expect(screen.getByTestId("actionButton-VIEW")).toBeInTheDocument();
    });
  });
});

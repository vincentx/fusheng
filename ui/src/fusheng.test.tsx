import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import axiosInstance from "./utils/httpClient";

describe("Fusheng test", () => {
  it("should display sidebar a list of all reports", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValue({
      data: {
        specs: [
          { name: "spec1", url: "url1" },
          { name: "spec2", url: "url2" },
        ],
      },
    });

    await waitFor(() => render(<App />));

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-spec1")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-spec2")).toBeInTheDocument();
  });
});

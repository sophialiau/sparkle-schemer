import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Sparkle Schemer editor", () => {
  it("renders the default grid and paints and erases a stone", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByRole("button", { name: /^Stone at/ })).toHaveLength(64);

    const firstStone = screen.getByRole("button", {
      name: /Stone at row 1, column 1/,
    });
    await user.click(firstStone);

    expect(firstStone).toHaveAttribute("fill", "#e33a35");
    expect(within(screen.getByLabelText("Design statistics")).getByText("1"))
      .toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Erase/ }));
    await user.click(firstStone);
    expect(firstStone).toHaveAttribute("fill", "#ffffff");
  });

  it("changes grid type and dimensions", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Honeycomb" }));
    fireEvent.change(screen.getByLabelText("Rows"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Columns"), {
      target: { value: "4" },
    });

    expect(
      screen.getByLabelText("3 by 4 honeycomb rhinestone grid"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Stone at/ })).toHaveLength(12);
  });
});

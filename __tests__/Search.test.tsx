import Search from "@/app/components/Search";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Search Form", () => {
  it("renders a form", () => {
    render(<Search />);

    const form = screen.getByTestId("search-form");

    expect(form).toBeInTheDocument();
  });
  it("has an input", () => {
    render(<Search />);

    const form = screen.getByTestId("search-form");
    const input = screen.getByTestId("search-input");

    expect(form).toContainElement(input);
  });
  it("has a submit button", () => {
    render(<Search />);

    const form = screen.getByTestId("search-form");
    const button = screen.getByTestId("search-submit");

    expect(form).toContainElement(button);
  });
});

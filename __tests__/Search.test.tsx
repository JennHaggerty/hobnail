import Search from "@/app/components/Search";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Search", () => {
  it("renders a form", () => {
    render(<Search onSubmit={jest.fn()} />);

    const form = screen.getByTestId("search-form");
    const input = screen.getByTestId("search-input");
    const submit = screen.getByTestId("search");

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
  it("form changes on user input", () => {
    const mockSubmit = jest.fn();

    render(<Search onSubmit={mockSubmit} />);

    const form = screen.getByTestId("search-form");
    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "the lord of the rings" } });

    expect(form).toHaveFormValues({
      query: "the lord of the rings",
    });
  });
});

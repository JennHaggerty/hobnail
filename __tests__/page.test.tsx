import Page from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a header", () => {
    render(<Page />);

    const header = screen.getByTestId("header");

    expect(header).toBeInTheDocument();
  });
  it("the header renders a navigation element", () => {
    render(<Page />);

    const header = screen.getByTestId("header");
    const nav = screen.getByTestId("main-menu");

    expect(header).toContainElement(nav);
  });
  it("page renders a level 1 heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
  it("renders a main element", () => {
    render(<Page />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });
  it("renders a footer element", () => {
    render(<Page />);

    const footer = screen.getByTestId("footer");

    expect(footer).toBeInTheDocument();
  });
});

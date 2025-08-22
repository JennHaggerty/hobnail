import Nav from "@/app/components/Nav";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Nav", () => {
  const navId = "test-nav";
  const navItems = [{ title: "Search", id: "search-page", url: "/" }];

  it("renders a navigation element", () => {
    render(<Nav id={navId} items={navItems} />);

    const navElement = screen.getByRole("navigation");

    expect(navElement).toBeInTheDocument();
  });
  it("has at least one list item", () => {
    render(<Nav id={navId} items={navItems} />);

    const navItem = screen.getByRole("listitem");

    expect(navItem).toBeInTheDocument();
  });
});

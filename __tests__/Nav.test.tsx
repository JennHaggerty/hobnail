import Nav from "@/app/components/Nav";
import Page from "@/app/page";
import { strings } from "@/app/strings";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

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
  it("page to reload when clicking on Search", async () => {
    render(<Page />);

    delete window.location;
    window.location = { reload: jest.fn() };

    const searchPage = screen.getByTestId("search-page");

    await fireEvent.click(searchPage);

    const pageNum = screen.getByText("Page 1");

    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(pageNum).toBeInTheDocument();
  });
});

"use client";

import Link from "next/link";

interface Item {
  id: string;
  title: string;
  url?: string;
  onClick?: () => void;
  ariaLabel?: string;
  external?: boolean;
}

interface Props {
  id: string;
  items: Item[];
  ariaLabel?: string;
}

const Nav = (props: Props) => {
  const { ariaLabel, items, id } = props;

  return (
    <nav data-testid={id} aria-label={ariaLabel}>
      <ul>
        {items.map((link, i) => (
          <li key={id + "-navigation-item-" + i}>
            {link.url && (
              <Link
                data-testid={link.id}
                href={link.url}
                aria-label={link.ariaLabel}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                suppressHydrationWarning={true}
              >
                {link.title}
              </Link>
            )}
            {link.onClick && (
              <button
                data-testid={link.id}
                type="button"
                onClick={link.onClick}
                className="style-as-link"
              >
                {link.title}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

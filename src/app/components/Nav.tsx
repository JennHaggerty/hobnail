"use client";

import Link from "next/link";

interface Item {
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

/**
 * Displays a navigation element
 *
 * @typedef {object} Props
 * @param {string} id Identifier for nav element
 * @param {array} items An array of Items
 * @param {string} [ariaLabel] Optional accessible label naming element
 *
 * @typedef {object} Item
 * @param {string} title Menu item content/text
 * @param {string} [url] Optional url destination for menu item
 * @param {function} [onClick] Optional onClick handler
 * @param {string} [ariaLabel] Optional accessible description for menu item
 * @param {boolean} [external] Optional flag to open external links in new tab
 *
 */
const Nav = (props: Props) => {
  const { ariaLabel, items, id } = props;

  return (
    <nav data-testid={id} aria-label={ariaLabel}>
      <ul>
        {items.map((link, i) => (
          <li key={id + "-navigation-item-" + i}>
            {link.url && (
              <Link
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

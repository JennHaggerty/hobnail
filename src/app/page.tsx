"use client";

import { Suspense, useState } from "react";
import { strings } from "./strings";
import { config } from "./config";
import { fetchItems } from "./functions";
import Search from "./components/Search";
import List from "./components/List";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import Item from "./components/Item";
import ItemInterface from "./interfaces/ItemInterface";

const Page = () => {
  const [item, setItem] = useState<ItemInterface>();
  const [items, setItems] = useState<ItemInterface[]>();
  const [totalFound, setTotalFound] = useState(0);
  const [query, setQuery] = useState("");

  const h1HeadingText = item
    ? strings.itemTitle
    : items
    ? items.length > 0
      ? strings.listOfItems
      : strings.noItemsFound
    : strings.welcome;

  const h2HeadingText = item
    ? item.title
    : query
    ? strings.searchedForTitle.replace("{title}", query)
    : strings.searchFor;

  const listHeading = items
    ? strings.showingNumber.replace("{number}", items.length.toString()) +
      " " +
      strings.of +
      " " +
      strings.numberFound.replace("{number}", totalFound.toString())
    : "";

  const handleListClick = async (key: string) => {
    const target = items?.find((item) => item.key === key);

    if (target?.cover_edition_key) {
      const cover = await fetch(
        config.apiBookCover.replace("{key}", target.cover_edition_key),
      );

      target.cover = cover.url;
    }

    setItem(target);
  };

  return (
    <div className="wrapper" role="presentation">
      <header data-testid="header">
        <Nav
          ariaLabel={strings.mainMenu}
          items={config.mainNav.items}
          id={config.mainNav.id}
        />
      </header>

      <main data-testid="main">
        <Suspense fallback={<Loading />}>
          <div className="header-items">
            {h1HeadingText && <h1>{h1HeadingText}</h1>}
            {h2HeadingText && <h2>{h2HeadingText}</h2>}
          </div>

          {!item && !items && (
            <Search
              onSubmit={async (e) => {
                const data = await fetchItems(e);

                setTotalFound(data.numFound);
                setQuery(data.q);
                setItems(data.docs);
              }}
            />
          )}

          {!item && items && (
            <List
              items={items}
              heading={listHeading}
              onClick={handleListClick}
            />
          )}

          {item && (
            <Item
              key={item.key}
              book_key={item.book_key}
              author_name={item.author_name}
              title={item.title}
              first_publish_year={item.first_publish_year}
              language={item.language}
              cover={item.cover}
              returnToListing={() => {
                setItem(undefined);
              }}
            />
          )}
        </Suspense>
      </main>

      <footer data-testid="footer">{config.copyright}</footer>
    </div>
  );
};

export default Page;

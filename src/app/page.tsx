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
  const [pageNum, setPageNum] = useState(1);

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

  const handleListClick = (key: string) => {
    const target = items?.find((item) => item.key === key);

    setPageNum(3);
    setItem(target);
  };

  return (
    <div className="wrapper">
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

          {/** Page 1 */}
          {!item && !items && (
            <Search
              onSubmit={async (e) => {
                const data = await fetchItems(e);
                const formQuery = e.get("query")?.toString() || "";

                setTotalFound(data.docs.length);
                setQuery(formQuery);
                setItems(data.docs);
                setPageNum(2);
              }}
            />
          )}

          {/** Page 2 */}
          {!item && items && (
            <List
              items={items}
              heading={listHeading}
              onClick={handleListClick}
            />
          )}

          {/** Page 3 */}
          {item && (
            <Item
              key={item.key}
              book_key={item.book_key}
              author_name={item.author_name}
              title={item.title}
              first_publish_year={item.first_publish_year}
              language={item.language}
              returnToListing={() => {
                setItem(undefined);
                setPageNum(2);
              }}
            />
          )}
        </Suspense>
      </main>

      {/** Current page num */}
      {strings.pageNumber.replace("{number}", pageNum.toString())}

      <footer data-testid="footer">{config.copyright}</footer>
    </div>
  );
};

export default Page;

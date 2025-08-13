"use client";

import { Suspense, useState } from "react";
import { strings } from "./strings";
import { config } from "./config";
import Search from "./components/Search";
import List from "./components/List";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import Item from "./components/Item";
import ItemInterface from "./interfaces/ItemInterface";

const Page = () => {
  const [item, setItem] = useState<ItemInterface>();
  const [items, setItems] = useState<ItemInterface[]>();
  const [itemCount, setItemCount] = useState(0);
  const [totalFound, setTotalFound] = useState(0);
  const [searched, setSearched] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const h1HeadingText = item
    ? strings.itemTitle
    : items
    ? strings.listOfItems
    : strings.welcome;

  const h2HeadingText = item
    ? item.title
    : searched
    ? strings.searchedForTitle.replace("{title}", searched)
    : strings.searchFor;

  const listHeading =
    strings.showingNumber.replace("{number}", itemCount.toString()) +
    " " +
    strings.of +
    " " +
    strings.numberFound.replace("{number}", totalFound.toString());

  const fetchItems = async (formData: FormData) => {
    const query = formData.get("query")!.toString();
    const queryString = query;
    const api = config.api;
    const params = config.apiParams;
    const url = params ? api + queryString + params : api + queryString;
    const data = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.docs.map((doc: ItemInterface) => {
          doc.book_key = doc.key;
        });
        return data;
      })
      .catch();

    setSearched(query);
    setTotalFound(data.numFound);
    setItems(data.docs);
    setItemCount(data.docs.length);
    setPageNum(2);
  };

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
          items={config.mainNav}
          id={"main-menu"}
        />
      </header>

      <main data-testid="main">
        <Suspense fallback={<Loading />}>
          <div className="header-items">
            <h1>{h1HeadingText}</h1>
            <h2>{h2HeadingText}</h2>
          </div>
          {!item && !items && <Search onSubmit={fetchItems} />}

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
              returnToListing={() => {
                setItem(undefined);
                setPageNum(2);
              }}
            />
          )}
        </Suspense>
      </main>

      {strings.pageNumber.replace("{number}", pageNum.toString())}

      <footer data-testid="footer">{config.copyright}</footer>
    </div>
  );
};

export default Page;

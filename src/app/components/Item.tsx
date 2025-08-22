import Link from "next/link";
import { config } from "../config";
import { strings } from "../strings";
import ItemInterface from "../interfaces/ItemInterface";

const Item = (props: ItemInterface) => {
  const {
    book_key,
    author_name,
    first_publish_year,
    language,
    returnToListing,
  } = props;

  const key = book_key;

  return (
    <div data-testid="item" className="item">
      {author_name &&
        strings.writtenBy.replace("{author}", author_name.join(", ")) + "."}
      <br />
      {first_publish_year &&
        strings.publishedIn + " " + first_publish_year + "."}
      <br />
      {language &&
        strings.availableInLanguages + ": " + language.join(", ") + "."}

      <div className="footer">
        {key && (
          <Link
            aria-label={strings.viewMoreonOpenLibrary}
            href={config.apiViewMoreLinkKey.replace("{key}", book_key)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.viewMore}
          </Link>
        )}
        <button
          data-testid="item-page-back-to-listings"
          className="style-as-link"
          type="button"
          onClick={returnToListing}
        >
          {strings.backToListings}
        </button>
      </div>
    </div>
  );
};

export default Item;

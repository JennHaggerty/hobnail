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
    cover,
  } = props;

  const key = book_key;

  return (
    <div data-testid="item" className="item">
      {cover && (
        <img className="lg:max-w-[350px] m-auto pb-5" src={cover} alt="" />
      )}
      {author_name && (
        <p>
          {strings.writtenBy.replace("{author}", author_name.join(", ")) + "."}
        </p>
      )}
      {first_publish_year && (
        <p>{strings.publishedIn + " " + first_publish_year + "."}</p>
      )}
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

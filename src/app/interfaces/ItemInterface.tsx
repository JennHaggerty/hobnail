interface ItemInterface {
  title: string;
  key: string;
  book_key: string;
  author_name?: string[];
  first_publish_year?: number;
  language?: string[];
  returnToListing?: () => void;
  cover_edition_key?: string;
  cover?: string;
}

export default ItemInterface;

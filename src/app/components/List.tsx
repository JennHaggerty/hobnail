import ItemInterface from "../interfaces/ItemInterface";
import { strings } from "../strings";

interface Props {
  items: ItemInterface[];
  onClick?: (key: string) => void;
  heading?: string;
}

/**
 * Displays a navigation element
 *
 * @typedef {object} props
 * @param {array} items An array of ItemInterfaces
 * @param {function} [onClick] Optional, handles user clicking on title
 * @param {string} [heading] Optional <h2> header element
 *
 */
const List = (props: Props) => {
  const { items, heading, onClick } = props;

  return (
    <div data-testid="list" className="booklist">
      <p>{heading}</p>
      <ol>
        {!items ? (
          <></>
        ) : (
          items.map((item, index) => (
            <li key={"item-" + index}>
              <div>
                {item.key && onClick ? (
                  <button
                    className="style-as-link"
                    onClick={() => onClick(item.key)}
                  >
                    {item.title}
                  </button>
                ) : (
                  item.title
                )}{" "}
                {item.author_name &&
                  strings.by + " " + item.author_name.join(", ")}
              </div>
            </li>
          ))
        )}
        {}
      </ol>
    </div>
  );
};

export default List;

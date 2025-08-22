import ItemInterface from "../interfaces/ItemInterface";
import { strings } from "../strings";

interface Props {
  items: ItemInterface[];
  onClick?: (key: string) => void;
  heading?: string;
}

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

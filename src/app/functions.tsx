import { config } from "./config";
import ItemInterface from "./interfaces/ItemInterface";

export const fetchItems = async (formData: FormData) => {
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

  return data;
};

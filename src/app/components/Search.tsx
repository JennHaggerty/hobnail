"use client";

import { useFormStatus } from "react-dom";
import { strings } from "../strings";

interface Props {
  onSubmit?: (formData: FormData) => void | Promise<void>;
}

const Search = (props: Props) => {
  const { onSubmit } = props;
  const { pending } = useFormStatus();

  return (
    <form data-testid="search-form" action={onSubmit}>
      <input
        data-testid="search-input"
        name="query"
        type="text"
        placeholder={strings.searchPlaceholder}
      />
      <button data-testid="search-submit" type="submit" disabled={pending}>
        {strings.search}
      </button>
    </form>
  );
};

export default Search;

import { strings } from "../strings";
import SubmitButton from "./SubmitButton";

interface Props {
  onSubmit: (formData: FormData) => void | Promise<void>;
  hideButton?: boolean;
}

const Search = (props: Props) => {
  const { onSubmit, hideButton } = props;

  return (
    <div data-testid="search" className="w-full flex align-stretch">
      <form data-testid="search-form" action={onSubmit}>
        <input
          aria-label={strings.searchFor}
          data-testid="search-input"
          name="query"
          type="text"
          placeholder={strings.searchPlaceholder}
          required
          className="rounded-s-lg border-none"
        />
        {!hideButton && (
          <SubmitButton
            id={"search-submit-button"}
            content={strings.search}
            pendingContent={strings.searching}
            className="rounded-e-lg text-white border-none"
          />
        )}
      </form>
    </div>
  );
};

export default Search;

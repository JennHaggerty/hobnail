import { strings } from "../strings";
import SubmitButton from "./SubmitButton";

interface Props {
  onSubmit: (formData: FormData) => void | Promise<void>;
  hideButton?: boolean;
}

const Search = (props: Props) => {
  const { onSubmit, hideButton } = props;

  return (
    <div data-testid="search" className="search">
      <form className="w-full" data-testid="search-form" action={onSubmit}>
        <div dir="ltr" className="w-full">
          <input
            aria-label={strings.searchFor}
            data-testid="search-input"
            name="query"
            type="text"
            placeholder={strings.searchPlaceholder}
            required
            className="w-full rounded-s-lg"
          />
        </div>
        <div dir="rtl">
          {!hideButton && (
            <SubmitButton
              id={"search-submit-button"}
              content={strings.search}
              pendingContent={strings.searching}
              className="rounded-s-lg text-white"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;

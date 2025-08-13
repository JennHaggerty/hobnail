import { useLinkStatus } from "next/link";
import { strings } from "../strings";

/**
 * Displays a loading message
 */
const Loading = () => {
  const { pending } = useLinkStatus();

  return pending ? (
    <div
      data-testid="loading"
      role="status"
      aria-live="polite"
      aria-label={strings.loadingContent}
    >
      {strings.loading}...
    </div>
  ) : null;
};

export default Loading;

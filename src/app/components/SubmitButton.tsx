"use client";

import { useFormStatus } from "react-dom";

interface Props {
  id: string;
  content: string;
  pendingContent?: string;
  className?: string;
}

const SubmitButton = (props: Props) => {
  const { id, content, pendingContent, className } = props;
  const status = useFormStatus();

  const buttonText =
    status.pending && pendingContent ? pendingContent : content;

  return (
    <button
      data-testid={id}
      type="submit"
      disabled={status.pending}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;

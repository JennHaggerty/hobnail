"use client";

import { useFormStatus } from "react-dom";

interface Props {
  id: string;
  content: string;
  pendingContent?: string;
  className?: string;
}

/**
 * Displays a submit button
 *
 * @typedef {object} Props
 * @param {string} id Required for tests
 * @param {string} content Default button content
 * @param {string} [pendingContent] Optional content to display during form's pending status
 * @param {string} [className] Optional button className
 *
 *
 */
const SubmitButton = (props: Props) => {
  const { id, content, pendingContent, className } = props;
  const status = useFormStatus();

  const buttonText =
    status.pending && pendingContent ? pendingContent : content;

  return (
    <button
      data-testid={id + "-submit-button"}
      type="submit"
      disabled={status.pending}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;

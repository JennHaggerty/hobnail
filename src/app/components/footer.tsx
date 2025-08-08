import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
const Footer = (props: Props) => {
  const { children } = props;

  return (
    <footer role="footer" title="footer">
      {children}
    </footer>
  );
};

export default Footer;

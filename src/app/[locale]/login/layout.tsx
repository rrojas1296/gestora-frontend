import PublicPage from "@/guards/PublicPage";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return <PublicPage>{children}</PublicPage>;
};

export default LoginLayout;

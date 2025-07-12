import React, { ReactNode } from "react";
import { Button as ButtonBase } from "gestora-lib";

interface Props {
  children?: ReactNode;
  variant?: "icon" | "filled" | "outlined" | "ghost";
}

const Button = ({ children, variant }: Props) => {
  return <ButtonBase variant={variant}>{children}</ButtonBase>;
};

export default Button;

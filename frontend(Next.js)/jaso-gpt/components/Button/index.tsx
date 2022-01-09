import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import * as S from "./styles";

export type Size = "sm" | "md" | "lg";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: Size;
  children: ReactNode;
}

const Button = ({
  size = "sm",
  children,
  type = "button",
  ...props
}: Props) => {
  return (
    <S.Frame size={size} type={type} {...props}>
      {children}
    </S.Frame>
  );
};

export default Button;

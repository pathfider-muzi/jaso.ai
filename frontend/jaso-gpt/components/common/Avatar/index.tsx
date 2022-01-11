import { ImageProps } from "next/image";
import * as S from "./styles";

export type Size = "sm" | "md" | "lg";

const SIZE_INFO: {
  [key in Size]: {
    width: number;
    height: number;
  };
} = {
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 50,
    height: 50,
  },
  lg: {
    width: 100,
    height: 100,
  },
} as const;

interface Props extends ImageProps {
  src: string;
  alt: string;
  size: Size;
}

const Avatar = ({ src, size, alt, ...props }: Props) => {
  const { width, height } = SIZE_INFO[size];

  return (
    <S.Frame src={src} alt={alt} width={width} height={height} {...props} />
  );
};

export default Avatar;

import Image, { ImageProps } from "next/image";

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
    width: 120,
    height: 120,
  },
} as const;

export interface Props extends ImageProps {
  _size: Size;
}

const Logo = ({ _size = "sm" }: Props) => {
  const { width, height } = SIZE_INFO[_size];

  return <Image src="/logo.png" alt="Logo" width={width} height={height} />;
};

export default Logo;

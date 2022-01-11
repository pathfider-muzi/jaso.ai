import Image from "next/image";

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

export interface Props {
  size: Size;
}

const Logo = ({ size = "sm" }: Props) => {
  const { width, height } = SIZE_INFO[size];

  return <Image src="/logo.png" alt="Logo" width={width} height={height} />;
};

export default Logo;

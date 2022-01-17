import Footer from "@/components/_common/Footer";
import Header from "@/components/_common/Header";
import BRAND_NAME from "@/constants/brandName";
import Head from "next/head";
import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const Screen = ({ title, description, children, ...props }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | ${BRAND_NAME}`}</title>
        <meta name="description" content={description || ""} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <S.MainWrapper {...props}>{children}</S.MainWrapper>
      <Footer />
    </>
  );
};

export default Screen;

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { BRAND_NAME } from "@/constants/brandName";
import Head from "next/head";
import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const Screen = ({ title, description, children }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | ${BRAND_NAME}`}</title>
        <meta name="description" content={description || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <S.MainWrapper>{children}</S.MainWrapper>
      <Footer />
    </>
  );
};

export default Screen;

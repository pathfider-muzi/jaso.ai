import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainIntroduction from "../../components/MainIntroduction";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>JASO-GPT</title>
        <meta name="description" content="AI 자소서 assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainIntroduction />
      <Footer />
    </div>
  );
};

export default Home;

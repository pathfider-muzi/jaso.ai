import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>JASO-GPT</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>AI 자소서 Assistant</h1>

        <p className={styles.description}>
          카카오브레인의 <span className={styles.blue}>koGPT</span>가 당신의
          자기소개서 작성을 도와드립니다
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Get Start &rarr;</h2>
            {/* <p></p> */}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

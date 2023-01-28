import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta name="theme-color" content="#4285f4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <main className={styles.main}>hello there</main>
    </>
  );
};

export default Home;

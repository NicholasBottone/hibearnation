import styles from "../styles/about.module.css";
import Head from "next/head";
import { type NextPage } from "next";
import { privacy, title } from "../components/about";
import { bold, lines } from "../utils/text";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>privacy policy | hibearnation</title>
        <meta
          name="description"
          content="An information hub for residence halls at Brown University featuring reviews, floor plans, housing lottery spreadsheets, and more."
        />
      </Head>
      <main className={styles.main}>
        <Link href="/" passHref>
          <BiArrowBack style={{ marginRight: "0.2rem" }} />
          back
        </Link>
        <h1 className={styles.title}>{bold(title)} privacy policy</h1>
        <>{lines(privacy)}</>
      </main>
    </>
  );
};

export default Privacy;

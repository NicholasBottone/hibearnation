import styles from "../styles/about.module.css";
import Head from "next/head";
import { type NextPage } from "next";
import {
  about,
  contact,
  contribute,
  privacy,
  terms,
  title,
  who,
} from "../components/about";
import { bold, lines } from "../utils/text";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>about | hibearnation</title>
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
        <h1 className={styles.title}>what is {bold(title)}?</h1>
        <p>{bold(about)}</p>
        <h2 className={styles.title}>who made this?</h2>
        <a href="https://github.com/NicholasBottone/hibearnation/graphs/contributors">
          <img
            alt="profile pictures of contributors"
            src="https://contrib.rocks/image?repo=NicholasBottone/hibearnation"
          />
        </a>
        <p>{who}</p>
        <h2 className={styles.title}>how can i contribute?</h2>
        <p>{contribute}</p>
        <h2 className={styles.title}>how can i contact you?</h2>
        <p>{contact}</p>
        <h2 className={styles.title}>privacy policy</h2>
        <>{lines(privacy)}</>
        <h2 className={styles.title}>terms of service</h2>
        <>{lines(terms)}</>
      </main>
    </>
  );
};

export default About;

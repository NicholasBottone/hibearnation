import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "../utils/api";
import Searchbar from "../components/Searchbar";
import ListOfDorms from "../components/ListOfDorms";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  bearAsciiArt,
  houseAsciiArt,
  sciliAsciiArt,
  showerAsciiArt,
  sofaAsciiArt,
  chairAsciiArt,
  skateboardAsciiArt,
  lightbulbAsciiArt,
  toiletAsciiArt,
  bedAsciiArt,
} from "../components/ascii";
import { BiClipboard, BiTimeFive } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const { data } = api.locations.getNames.useQuery();
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>hibearnation</title>
        <meta
          name="description"
          content="A Brown University dorm review and information site."
        />
        <meta name="theme-color" content="#eac9c1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <p
          className={styles.title}
          style={{
            fontSize: "2rem",
            margin: 0,
          }}
        >
          hi<b style={{ color: "#822b2e" }}>bear</b>nation
        </p>

        <div>
          <a
            className={styles.promoButton}
            href="https://bit.ly/housinglottery23"
          >
            <BiClipboard />
            View Housing Lottery Spreadsheet
          </a>
        </div>

        <Searchbar search={search} setSearch={setSearch} />
        <div className={styles.ascii}>
          {sessionData ? (
            <>
              <img
                src={sessionData?.user?.image ?? ""}
                alt="Profile Picture"
                className={styles.ProfilePicture}
                onClick={() => void signOut()}
              />
            </>
          ) : (
            <div className={styles.SignIn} onClick={() => void signIn()}>
              Sign In
            </div>
          )}
        </div>

        {/* ternary operator for if data is undefined */}
        {data ? (
          <div className={styles.container}>
            <ListOfDorms dorms={data} curSearch={search} />
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
        <div className={styles.footer}>
          <p className={styles.promoText}>
            <BiTimeFive style={{ marginRight: "0.2rem" }} />
            Spreadsheet last updated 7 APR 6:20pm
          </p>
          <a
            className={styles.textLink}
            href="https://github.com/NicholasBottone/hibearnation"
          >
            <BsGithub style={{ marginRight: "0.2rem" }} />
            GitHub
          </a>
        </div>
        <div className={styles.ascii}>
          <div className={styles.BearAsciiArt}>
            <pre>{bearAsciiArt}</pre>
          </div>
          <div className={styles.HouseAsciiArt}>
            <pre>{houseAsciiArt}</pre>
          </div>
          <div className={styles.SciliAsciiArt}>
            <pre>{sciliAsciiArt}</pre>
          </div>
          <div className={styles.ShowerAsciiArt}>
            <pre>{showerAsciiArt}</pre>
          </div>
          <div className={styles.SofaAsciiArt}>
            <pre>{sofaAsciiArt}</pre>
          </div>
          <div className={styles.ToiletAsciiArt}>
            <pre>{toiletAsciiArt}</pre>
          </div>
          <div className={styles.LightbulbAsciiArt}>
            <pre>{lightbulbAsciiArt}</pre>
          </div>
          <div className={styles.BedAsciiArt}>
            <pre>{bedAsciiArt}</pre>
          </div>
          <div className={styles.ChairAsciiArt}>
            <pre>{chairAsciiArt}</pre>
          </div>
          <div className={styles.SkateboardAsciiArt}>
            <pre>{skateboardAsciiArt}</pre>
          </div>
        </div>
        <div className={styles.textSignIn}>
          {sessionData ? (
            <div onClick={() => void signOut()}>Sign Out</div>
          ) : (
            <div onClick={() => void signIn()}>Sign In</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

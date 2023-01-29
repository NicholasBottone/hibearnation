import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "../utils/api";
import Searchbar from "../components/Searchbar";
import ListOfDorms from "../components/ListOfDorms";
import Modal from "../components/Modal";
import Review from "../components/buttons/Review";
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

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = api.locations.getNames.useQuery();
  return (
    <>
      <Head>
        <title>hibearnation</title>
        <meta
          name="description"
          content="A Brown University dorm review and information site."
        />
        <meta name="theme-color" content="#4285f4" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <Modal show={showModal}>
          <Review
            closeModal={() => setShowModal(false)}
            location="Grad Center Hall A"
          />
        </Modal>
        <p
          className={styles.title}
          onClick={() => setShowModal(true)}
          style={{
            fontSize: "2rem",
            margin: 0,
          }}
        >
          hi<b style={{ color: "#822b2e" }}>bear</b>nation
        </p>
        <Searchbar search={search} setSearch={setSearch} />

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
      </main>
    </>
  );
};

export default Home;

import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "../utils/api";
import Searchbar from "../components/Searchbar";
import ListOfDorms from "../components/ListOfDorms";
import Modal from "../components/Modal";
import Review from "../components/Review";
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
  const { data } = api.locations.getAll.useQuery();
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
        <div className={styles.container}>
          <ListOfDorms
            dorms={[
              "Caswell Hall",
              "Grad Center A",
              "Grad Center B",
              "Grad Center C",
              "Grad Center D",
              "Gregorian Quad A",
              "Gregorian Quad B",
              "Hegeman Hall",
              "Hope College",
              "Littlefield Hall",
              "Minden Hall",
              "New Pembroke 1",
              "New Pembroke 2",
              "Perkins Hall",
              "Slater Hall",
              "Young Orchard 10",
              "Young Orchard 2",
              "Young Orchard 4",
            ]}
            curSearch={search}
          />
          <div className={styles.ascii}>
            <pre className={styles.BearAsciiArt}>{bearAsciiArt}</pre>
            <pre className={styles.HouseAsciiArt}>{houseAsciiArt}</pre>
            <pre className={styles.SciliAsciiArt}>{sciliAsciiArt}</pre>
            <pre className={styles.ShowerAsciiArt}>{showerAsciiArt}</pre>
            <pre className={styles.SofaAsciiArt}>{sofaAsciiArt}</pre>
            <pre className={styles.ChairAsciiArt}>{chairAsciiArt}</pre>
            <pre className={styles.SkateboardAsciiArt}>
              {skateboardAsciiArt}
            </pre>
            <pre className={styles.LightbulbAsciiArt}>{lightbulbAsciiArt}</pre>
            <pre className={styles.ToiletAsciiArt}>{toiletAsciiArt}</pre>
            <pre className={styles.BedAsciiArt}>{bedAsciiArt}</pre>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

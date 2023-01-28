import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "../utils/api";
import Searchbar from "../components/Searchbar";
import ListOfDorms from "../components/ListOfDorms";
import Modal from "../components/Modal";
import Review from "../components/Review";

const bearAsciiArt = `           (o\\---/o)  
            ( . . )                  .(  
   ________ ( (T) )                 /%/\\  
 o|               /                (%(%))
  |  ____________/                .-'..'-.
  |||         |||                '-'.'''-'     
`;

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [search, setSearch] = useState("");
  // const { data } = api.locations.getAll.useQuery();
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
          <Review closeModal={() => setShowModal(false)} />
        </Modal>
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
          <div className={styles.MiscBox}>
            <b
              style={{
                fontFamily: "monospace",
                fontSize: "2rem",
                marginTop: "2rem",
              }}
            >
              hibearnation
            </b>
            <div className={styles.BearAsciiArt}>
              <pre onClick={() => alert("Ow! That hurt!")}>{bearAsciiArt}</pre>
            </div>
            <p style={{ width: "80%" }}>
              <b>hibearnation</b> is a dorm information and review website for
              students at Brown University. Search for a dorm to see other
              reviews, aggregated information, and more!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

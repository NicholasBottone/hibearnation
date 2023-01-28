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

const houseAsciiArt = `
    %
     %
  ___||_____
 /         /\\
/_________/  \\
|    _    |  |
|[] | | []|[]|
|   | |   |  |
`;

const sciliAsciiArt = `
____      ____
|  |______|  |
|  |======|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |______|  |
|  |      |  |
|  |      |  |
`;

const showerAsciiArt = `

    /=========||
   ||         ||
  /__\\        ||
  , ..        ||
 , . * ,      ||
  * , .       ||
 ,, . ,,      ||
 .* , . ,     ||
 ., .  *      ||
 .   , ..     ||
 .* , ..      ||
 , . , **     ||
  * , .       ||
* ,, . ,,     ||
  _____       ||
`;

const sofaAsciiArt = `
 .-="""""""""""=-.
 | . . . . . . . |
 | .'.'.'.'.'.'. |
()_______________()
||_______________||
 W               W
`;

const toiletAsciiArt = `
     _
    | |
 ___| |
(    .'
 )  ( 
  `;

const lightbulbAsciiArt = `
  :
  '.  _  .'
 -=  (~)  =-   
  .'  #  '.
  `;

const bedAsciiArt = `
  ___                ______     ___
  | |_______________/______\\___| |
  | |                           | |
  | |
  `;
const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
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
        <p
          className={styles.title}
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
        </div>
      </main>
    </>
  );
};

export default Home;

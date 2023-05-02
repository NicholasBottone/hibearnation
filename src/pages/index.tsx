import styles from "../styles/index.module.css";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetStaticProps, NextPage } from "next";
import superjson from "superjson";
import { createInnerTRPCContext } from "../server/api/trpc";
import { type AppRouter, appRouter } from "../server/api/root";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
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
import { BsGithub, BsInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
import { bold } from "../utils/text";
import { title } from "../components/about";
import ListOfDormsSkeleton from "../components/ListOfDormsSkeleton";
import DormSkeleton from "../components/DormSkeleton";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const { data } = api.locations.getNames.useQuery();
  const { data: sessionData } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== Router.asPath && setIsLoading(true);
    const handleComplete = (url: string) =>
      url === Router.asPath && setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const MyHead = () => (
    <Head>
      <title>hibearnation</title>
      <meta
        name="description"
        content="An information hub for residence halls at Brown University featuring reviews, floor plans, housing lottery spreadsheets, and more."
      />
    </Head>
  );

  if (isLoading) {
    return (
      <>
        <MyHead />
        <DormSkeleton />
      </>
    );
  }

  return (
    <>
      <MyHead />
      <main className={styles.main}>
        <h1 className={styles.title}>{bold(title)}</h1>

        {/* <PromoButton /> */}

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

        {data ? (
          <div className={styles.container}>
            <ListOfDorms dorms={data} curSearch={search} />
          </div>
        ) : (
          <div className={styles.container}>
            <ListOfDormsSkeleton />
          </div>
        )}
        <div className={styles.footer}>
          {/* <p className={styles.promoText}>
            <BiTimeFive style={{ marginRight: "0.2rem" }} />
            Spreadsheet updated regularly!
          </p> */}
          <p className={styles.textLinks}>
            <a
              className={styles.textLink}
              href="https://github.com/NicholasBottone/hibearnation"
            >
              <BsGithub style={{ marginRight: "0.2rem" }} />
              GitHub
            </a>
            <Link className={styles.textLink} href="/about">
              <BsInfoCircleFill style={{ marginRight: "0.2rem" }} />
              About
            </Link>
            <a
              className={styles.textLink}
              href="https://bit.ly/housinglottery23"
            >
              <BiClipboard style={{ marginRight: "0.2rem" }} />
              Spreadsheet
            </a>
          </p>
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

const PromoButton = () => (
  <a className={styles.textLink} href="https://bit.ly/housinglottery23">
    <BiClipboard style={{ marginRight: "0.2rem" }} />
    Spreadsheet
  </a>
);

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createServerSideHelpers<AppRouter>({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  await ssg.locations.getNames.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;

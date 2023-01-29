import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { env } from "../../env/client.mjs";

import Dorm from "../../components/Dorm";
import Map, { Marker } from "react-map-gl";

// export default function building() {
const MyPage: NextPage = () => {
  const router = useRouter();
  const buildingId = router.query.buildingId;

  // API call to get the building info by its ID
  // Check if buildingId is a string
  if (typeof buildingId !== "string") {
    return <div>Invalid building ID</div>;
  }
  const building = api.locations.getOne.useQuery({ id: buildingId });
  console.log(building);

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

      {/* Loading screen if building is undefined */}
      {!building.data ? (
        <div>Loading...</div>
      ) : (
        <Dorm
          name={building.data.name}
          areaName={building.data.areaName}
          summary={building.data.summary}
          location={building.data.address}
          sublocations={building.data.sublocations}
          floorplans={building.data.floorplans}
          images={[
            "https://reslife.brown.edu/sites/default/files/styles/classic_xsml/public/2020-04/GradCtrB_2.jpg?h=7e0400c3&itok=0Tgxt1fl",
            "https://upload.wikimedia.org/wikipedia/commons/8/85/BrownUniversity-GraduateCenter.jpg",
            "https://live.staticflickr.com/2590/3695901200_2c207712ef_b.jpg",
            "https://media.gettyimages.com/id/1420361871/photo/brown-university-grad-center-building.jpg?s=612x612&w=gi&k=20&c=tx5tVly5Ivpkxc5v8SwL1kk8XHzUbxMSECVD307fk9Y=",
            "https://fastly.4sqi.net/img/general/200x200/96202174_EvZ4ECtBXyzkIBtUcRT6C3IPVUyAyHO_1UP-0eDevrE.jpg",
          ]}
        />
      )}
    </>
  );
};

export default MyPage;

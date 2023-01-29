import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { env } from "../../env/client.mjs";

import Dorm from "../../components/Dorm";

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
        <meta name="theme-color" content="#eac9c1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      {/* Loading screen if building is undefined */}
      {!building.data ? (
        <div>Loading...</div>
      ) : (
        <Dorm
          id={building.data.id}
          name={building.data.name}
          areaName={building.data.areaName}
          summary={building.data.summary}
          location={building.data.address}
          sublocations={building.data.sublocations}
          floorplans={building.data.FloorPlan}
          reviews={building.data.Review}
          images={building.data.Media.map((media) => media.url)}
          refetch={() => void building.refetch()}
        />
      )}
    </>
  );
};

export default MyPage;

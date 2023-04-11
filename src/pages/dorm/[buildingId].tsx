import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextError from "next/error";
import Head from "next/head";
import { api } from "../../utils/api";
import Dorm from "../../components/Dorm";
import DormSkeleton from "../../components/DormSkeleton";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { type AppRouter, appRouter } from "../../server/api/root";
import superjson from "superjson";

interface BuildingPageProps {
  buildingId: string;
}

const BuildingPage: NextPage<BuildingPageProps> = (props) => {
  const buildingId = props.buildingId;

  // API call to get the building info by its ID
  const building = api.locations.getOne.useQuery(
    { id: buildingId },
    { refetchOnMount: "always" }
  );

  return (
    <>
      <Head>
        {building.data ? (
          <>
            <title>{`${building.data.name} | hibearnation`}</title>
            <meta name="description" content={building.data.summary} />
            <meta
              name="rating"
              content={String(
                building.data.Review.reduce(
                  (acc, review) => acc + review.overallRating,
                  0
                ) / building.data.Review.length
              )}
            />
          </>
        ) : (
          <title>hibearnation</title>
        )}
      </Head>

      {/* Loading screen if building is undefined */}
      {!building.data ? (
        building.isLoading ? (
          <DormSkeleton />
        ) : (
          <NextError statusCode={404} />
        )
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

export const getStaticProps: GetStaticProps<BuildingPageProps> = async (
  context
) => {
  if (typeof context.params?.buildingId !== "string") {
    return {
      notFound: true,
    };
  }

  const ssg = createServerSideHelpers<AppRouter>({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  await ssg.locations.getOne.prefetch({ id: context.params.buildingId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      buildingId: context.params.buildingId,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ssg = createServerSideHelpers<AppRouter>({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  const buildings = await ssg.locations.getNames.fetch();

  return {
    paths: buildings.map((building) => ({
      params: {
        buildingId: building.id,
      },
    })),
    fallback: false,
  };
};

export default BuildingPage;

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  // Creates new areas
  createAreas: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.admin) {
      return "You are not an admin";
    }

    await ctx.prisma.area.createMany({
      data: [
        {
          name: "New Area",
        },
      ],
    });

    return "Areas created";
  }),

  // Creates new locations
  createLocation: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.admin) {
      return "You are not an admin";
    }

    await ctx.prisma.location.createMany({
      data: [
        {
          name: "New Location",
          summary: "New Location Summary",
          areaName: "New Area",
          address: "1234 Main St",
          coordinates: "1234, 5678",
          sublocations: ["1234", "5678"],
          floorplans: ["abcd", "abcd"],
        },
      ],
    });

    return "Locations created";
  }),

  //
});

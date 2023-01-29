import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  // Creates new areas
  createAreas: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user?.admin) {
        return "You are not an admin";
      }

      await ctx.prisma.area.create({
        data: {
          name: input.name,
        },
      });

      return "Areas created";
    }),

  // Creates new locations
  createLocation: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        summary: z.string(),
        areaName: z.string(),
        address: z.string(),
        coordinates: z.string(),
        sublocations: z.array(z.string()),
        floorplans: z.array(z.object({ url: z.string(), name: z.string() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user?.admin) {
        return "You are not an admin";
      }

      const location = await ctx.prisma.location.create({
        data: {
          name: input.name,
          summary: input.summary,
          areaName: input.areaName,
          address: input.address,
          coordinates: input.coordinates,
          sublocations: input.sublocations,
        },
      });

      await ctx.prisma.floorPlan.createMany({
        data: input.floorplans.map((floorplan) => ({
          url: floorplan.url,
          name: floorplan.name,
          locationId: location.id,
        })),
      });

      return "Locations created";
    }),

  //
});

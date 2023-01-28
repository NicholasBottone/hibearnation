import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  // Creates new areas
  createAreas: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) {
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
        floorplans: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) {
        return "You are not an admin";
      }

      await ctx.prisma.location.create({
        data: {
          name: input.name,
          summary: input.summary,
          areaName: input.areaName,
          address: input.address,
          coordinates: input.coordinates,
          sublocations: input.sublocations,
          floorplans: input.floorplans,
        },
      });

      return "Locations created";
    }),

  //
});

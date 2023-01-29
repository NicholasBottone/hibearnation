import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const locationsRouter = createTRPCRouter({
  // Returns full data of all the locations
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany();
  }),

  // Returns partial data of all the locations
  getNames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),

  // Returns full data of a single location
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.location.findUnique({
        where: {
          id: input.id,
        },
        include: {
          FloorPlan: true,
        },
      });
    }),

  getAllAreas: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.area.findMany();
  }),
});

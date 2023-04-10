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
  // when returning reviews, sort by number of upvotes
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.location.findUnique({
        where: {
          id: input.id,
        },
        include: {
          FloorPlan: true,
          Media: true,
          Review: {
            orderBy: {
              upvotes: {
                _count: "desc",
              },
            },
            include: {
              upvotes: {
                select: {
                  id: true,
                },
              },
              downvotes: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
    }),

  getAllAreas: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.area.findMany();
  }),
});

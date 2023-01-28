import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const reviewsRouter = createTRPCRouter({
  // Takes a location, and returns a list of all reviews for that location
  getByLocation: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          locationId: input.id,
        },
      });
    }),

  // Creates a new review for a given location
  createReview: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        locationId: z.string(),
        media: z.array(z.string()).optional(),
        overallRating: z.number().int().min(1).max(10),
        amenitiesRating: z.number().int().min(1).max(10),
        comfortRating: z.number().int().min(1).max(10),
        locationRating: z.number().int().min(1).max(10),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.review.create({
        data: {
          title: input.title,
          body: input.body,
          locationId: input.locationId,
          media: input.media ?? [],
          overallRating: input.overallRating,
          amenitiesRating: input.amenitiesRating,
          comfortRating: input.comfortRating,
          locationRating: input.locationRating,
          authorId: ctx.session.user.id,
        },
      });
    }),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reviewsRouter = createTRPCRouter({
  // Takes a location, and returns a list of all reviews for that location
  // getByLocation: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.prisma.review.findMany({
  //       where: {
  //         locationId: input.id,
  //       },
  //     });
  //   }),

  // Creates a new review for a given location
  createReview: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        locationId: z.string(),
        overallRating: z.number().int().min(1).max(10),
        amenitiesRating: z.number().int().min(1).max(10),
        comfortRating: z.number().int().min(1).max(10),
        locationRating: z.number().int().min(1).max(10),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.review.create({
        data: {
          body: input.body,
          locationId: input.locationId,
          overallRating: input.overallRating,
          amenitiesRating: input.amenitiesRating,
          comfortRating: input.comfortRating,
          locationRating: input.locationRating,
          authorId: ctx.session.user.id,
        },
      });
    }),

  // Posts media to a location
  postMedia: protectedProcedure
    .input(
      z.object({
        locationId: z.string(),
        media: z
          .string()
          .url()
          .regex(/https:\/\/i\.imgur\.com\/.*/),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.prisma.location.findUnique({
        where: {
          id: input.locationId,
        },
      });

      if (!location) {
        return "Location not found";
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        return "User not found";
      }

      await ctx.prisma.media.create({
        data: {
          locationId: input.locationId,
          url: input.media,
          authorId: user.id,
        },
      });

      return "Media posted";
    }),

  // Upvotes a review
  upvoteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!review) {
        return "Review not found";
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        return "User not found";
      }

      await ctx.prisma.review.update({
        where: {
          id: input.id,
        },
        data: {
          upvotes: {
            connect: {
              id: user.id,
            },
          },
          downvotes: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });

      return "Upvoted";
    }),

  undoUpvoteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!review) {
        return "Review not found";
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        return "User not found";
      }

      await ctx.prisma.review.update({
        where: {
          id: input.id,
        },
        data: {
          upvotes: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });

      return "Upvote undone";
    }),

  // Downvotes a review
  downvoteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!review) {
        return "Review not found";
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        return "User not found";
      }

      await ctx.prisma.review.update({
        where: {
          id: input.id,
        },
        data: {
          downvotes: {
            connect: {
              id: user.id,
            },
          },
          upvotes: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });

      return "Downvoted";
    }),

  undoDownvoteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!review) {
        return "Review not found";
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        return "User not found";
      }

      await ctx.prisma.review.update({
        where: {
          id: input.id,
        },
        data: {
          downvotes: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });

      return "Downvote undone";
    }),
});

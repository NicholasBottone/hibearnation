import { createTRPCRouter } from "./trpc";
import { locationsRouter } from "./routers/locations";
import { adminRouter } from "./routers/admin";
import { reviewsRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  locations: locationsRouter,
  admin: adminRouter,
  reviews: reviewsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

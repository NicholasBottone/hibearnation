import { createTRPCRouter } from "./trpc";
import { locationsRouter } from "./routers/locations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  locations: locationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

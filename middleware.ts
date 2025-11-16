// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// публичные пути (без авторизации)
const isPublicRoute = createRouteMatcher([
  "/api/webhook",  // Stripe webhook (app/(client)/api/webhook/route.ts => /api/webhook)
  "/studio(.*)",   // Sanity Studio
]);

export default clerkMiddleware(async (auth, req) => {
  // защищаем всё, что НЕ публично
  if (!isPublicRoute(req)) {
    await auth.protect();     
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // всё кроме статики и _next
    "/(api|trpc)(.*)",             // и весь API/TRPC
  ],
};
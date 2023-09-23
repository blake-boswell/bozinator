export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/profile"],
  // Protected routes (require auth)
  /**
   * Match the following request paths:
   * - stable-master/profile
   */
  matcher: ['/projects/stable-master/profile', '/session'],
};

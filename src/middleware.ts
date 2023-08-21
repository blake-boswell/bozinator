export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/profile"],
  // Protected routes (require auth)
  matcher: ["/((?!register|api|login).*)"],
};

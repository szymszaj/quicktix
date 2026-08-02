import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAccountPage = nextUrl.pathname.startsWith("/account");
      if (isAccountPage) return isLoggedIn;
      return true;
    },
  },
};

import NextAuth from "next-auth/next";

import { authOptions } from "./providers";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

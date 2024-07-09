import type { DefaultJWT } from 'next-auth/jwt';

interface UserSession {
  user: InsertUser;
  type: any;
  role: any;
  permission: Pany;
  jwt: {
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
}

declare module 'next-auth' {

  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session extends UserSession {}
  interface User extends InsertUser {}
}

declare module 'next-auth/jwt' {

  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT, UserSession {}
}

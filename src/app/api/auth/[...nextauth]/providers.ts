import type { NextAuthOptions } from 'next-auth';

import type { JWT } from 'next-auth/jwt';

import CredentialsProvider from 'next-auth/providers/credentials';

const Backend_URL = process.env.BACKEND_URL;

async function refreshToken(token: JWT): Promise<JWT> {

  const res = await fetch(Backend_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.jwt.refreshToken}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  if (response.statusCode === 401) {
    throw new Error('User Notfound');
  }

  return {
    ...token,
    jwt: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "Username or Email",
          type: "email",
          placeholder: "Input username or email",
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: "Input password",
        },
      },
      async authorize(credentials): Promise<any> {
        try {
          const res = await fetch(Backend_URL + '/login', {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            return null;
          }

          const parsedResponse = await res.json();
          const jwt = parsedResponse.access_token;

          return {
            ...credentials,
            jwt,
          };
        } catch (e) {
          return null;
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.jwt.expiresIn) return token;

      return await refreshToken(token);
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      session.type = token.type;
      session.role = token.role;
      session.permission = token.permission;
      session.jwt = token.jwt;

      return session;
    },
  },

  pages: {
    signIn: '/',
    error: '/no-access',
  },
};

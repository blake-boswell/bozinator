import {
  getServerSession as nextAuthGetServerSession,
  DefaultSession,
  SessionOptions,
  SessionStrategy,
  NextAuthOptions,
} from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendVerificationRequest } from './mailer';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';

const { NEXTAUTH_SECRET, EMAIL_SERVER, EMAIL_FROM } = process.env;

export const sessionOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
  providers: [
    // EmailProvider({
    //   server: EMAIL_SERVER,
    //   from: EMAIL_FROM,
    //   sendVerificationRequest: sendVerificationRequest,
    // }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Verify if email and pw were included in request body
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 2. Retrieve user from DB with the given email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // 3. Verify provided PW against the hashed PW in DB
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          // You can add any additional info about the user
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          // You can add any additional info about the user
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

export const getServerSession = () =>
  nextAuthGetServerSession(sessionOptions);

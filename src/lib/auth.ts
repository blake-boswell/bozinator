import {
  getServerSession as nextAuthGetServerSession,
  SessionStrategy,
  NextAuthOptions,
} from 'next-auth';
import { sendVerificationRequest } from './mailer';
import { prisma } from './prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

const { NEXTAUTH_SECRET, EMAIL_FROM } = process.env;

export const sessionOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
  debug: true,
  providers: [
    {
      id: 'mailgun',
      type: 'email',
      from: EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest,
    } as any,
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
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
      console.log('JWT Callback', { token, user });
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
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/register',
  },
};

export const getServerSession = () => nextAuthGetServerSession(sessionOptions);

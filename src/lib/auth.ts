import {
  getServerSession as nextAuthGetServerSession,
  SessionStrategy,
  NextAuthOptions,
} from 'next-auth';
import { sendVerificationRequest } from './mailer';
import { prisma } from './prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import logger from './pino';

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
    jwt: ({ token, user, account, profile }) => {
      if (user && account) {
        logger.debug(
          `Creating JWT token %o for user %o.${account ? ` Provider: %o` : ''}`,
          token,
          user,
          account,
        );
      } else {
        logger.debug(`Updating JWT token.`);
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    session: ({ session, token }) => {
      logger.debug('Checking session %o', session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/register',
  },
};

export const getServerSession = () => nextAuthGetServerSession(sessionOptions);

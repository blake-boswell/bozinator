import {
  getServerSession as nextAuthGetServerSession,
  DefaultSession,
  SessionOptions,
  SessionStrategy,
} from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendVerificationRequest } from './mailer';

const { NEXTAUTH_SECRET, EMAIL_SERVER, EMAIL_FROM } = process.env;

export const sessionOptions = {
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
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
};

export const getServerSession = () =>
  nextAuthGetServerSession(sessionOptions);

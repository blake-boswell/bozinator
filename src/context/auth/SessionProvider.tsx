'use client';
import { DefaultSession } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: DefaultSession | null;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}

import NextAuth from 'next-auth';
import { sessionOptions } from '@/lib/auth';

const handler = NextAuth(sessionOptions);

export { handler as GET, handler as POST };

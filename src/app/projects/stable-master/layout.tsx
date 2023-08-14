import { NextAuthProvider } from '@/app/providers';

export default async function StableMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <NextAuthProvider>
      <main>{children}</main>
    </NextAuthProvider>
  );
}

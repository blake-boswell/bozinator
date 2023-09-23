import { LoginButton, RegisterButton, LogoutButton } from '@/components/auth/Buttons';
import { User } from '@/components/user/User';
import { getServerSession } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession();
  const user = session ? session.user : null;

  return (
    <main>
      <h1>Stable Master</h1>
      <section>
        <p>
          Apartment parking, made simpler. Never type in those pesky car details
          again.
        </p>
        {user ? (
          <>
            <div>Welcome {user.name}</div>
            <User />
            <LogoutButton />
            <Link href="/projects/stable-master/profile">Profile</Link>
          </>
        ) : (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}>
            <div>
              <LoginButton />
              <RegisterButton />
              <pre>{JSON.stringify(session)}</pre>
              <User />
            </div>
            {/* Log in to create and use your car profile for instant parking!

            <AuthForm /> */}
          </div>
        )}
      </section>
    </main>
  );
}

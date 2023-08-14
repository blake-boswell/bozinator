import { useSession } from 'next-auth/react';
import { LoginButton, RegisterButton, LogoutButton, ProfileButton } from '@/components/auth/Buttons';
import { User } from '@/components/user/User';
import { getServerSession } from '@/lib/auth';

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
              <LogoutButton />
              <ProfileButton />
            </div>
            {/* Log in to create and use your car profile for instant parking!

            <AuthForm /> */}
          </div>
        )}
      </section>
    </main>
  );
}

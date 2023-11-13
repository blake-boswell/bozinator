import Card from '@/components/Card';
import { LoginButton, RegisterButton } from '@/components/auth/Buttons';
import { User } from '@/components/user/User';
import { getServerSession } from '@/lib/auth';
import Link from 'next/link';
import styles from './page.module.css';
import { getRegisteredCars } from '@/utils/car';

export default async function Home() {
  const session = await getServerSession();
  const user = session ? session.user : null;
  const cars = user ? await getRegisteredCars(user?.id) : [];

  return (
    <main>
      <h1 className="h3 mb-3">Stable Master</h1>
      <section>
        <p>
          Apartment parking, made simpler. Never type in those pesky car details
          again.
        </p>
        {user ? (
          <>
            <div className={styles.cars}>
              {cars.map((car) => (
                <Link href={`/projects/stable-master/car/${car.id}`} className={styles.car}  key={car.id}>
                  <Card>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://placehold.co/100x67" width="100%" height="auto" alt={`${car.color} ${car.make} ${car.model}`} />
                    <Card.Body>
                      <div className={`h5 ${styles['car-title']}`}>{car.color} {car.make} {car.model}</div>
                      <div className="h6">{car.licensePlateNo}</div>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-2">
              <Link className="btn btn-success" href="/projects/stable-master/create">+ Park a new car</Link>
            </div>
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

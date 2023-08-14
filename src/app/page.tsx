import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Projects</h1>
      <section>
        <div>
          <Link href="/projects/stable-master">Stable master</Link>
          <p>
            Apartment parking, made simpler. Never have to type in those pesky
            car details again.
          </p>
        </div>
      </section>
    </main>
  );
}

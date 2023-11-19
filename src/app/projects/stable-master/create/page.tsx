'use client'

import styles from './page.module.css';
import Form from "./form";
import { useRouter } from 'next/navigation';
import { RegisteredCar } from '@/types/car';
import Link from 'next/link';

export default function CreateCar() {
  const router = useRouter();

  function handleReroute(body: { car: RegisteredCar }) {
    try {
      router.push(`/projects/stable-master/car/${body.car.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className="h3 mb-3">Add Your Car</h1>
      <Link href="../" className="btn mb-8">&larr; Back to my cars</Link>
      <p>Enter some basic car information. This will be used to fill out the parking form on your behalf.</p>
      <Form className={styles.form} onSubmitSuccess={handleReroute} />
    </div>
  )
}
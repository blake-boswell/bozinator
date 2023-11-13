'use client'

import styles from './page.module.css';
import Form from "./form";
import { useRouter } from 'next/navigation';
import { Car } from '@prisma/client';
import { BackButton } from '@/components/Button/Back/BackButton';
import { RegisteredCar } from '@/types/car';

export default function CreateCar() {
  const router = useRouter();

  function handleReroute(body: { car: RegisteredCar }) {
    console.log(`Rerouting to: /projects/stable-master/car/${body.car.id}`);
    try {
      router.push(`/projects/stable-master/car/${body.car.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className="h3 mb-3">Add Your Car</h1>
      <BackButton className="mb-8">&larr; Back to my cars</BackButton>
      <p>Enter some basic car information. This will be used to fill out the parking form on your behalf.</p>
      <Form className={styles.form} onSubmitSuccess={handleReroute} />
    </div>
  )
}
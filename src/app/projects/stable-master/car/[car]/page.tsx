import styles from './page.module.css';
import { ArcadeButton } from "@/components/Button/Arcade/ArcadeButton";
import TextField from "@/components/Form/TextField/TextField";
import { getRegisteredCarById } from "@/utils/car";
import Image from 'next/image';
import Link from 'next/link';



export default async function Page({ params }: { params: { car: string }}) {
  const car = await getRegisteredCarById(params.car);

  if (!car) {
    return (
      <div>
        Car not found
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* <CarDetails /> */}
      <div className={styles.title}>
        <h1 className="h3 mb-3">{car.color} {car.make} {car.model}</h1>
        <Link className="btn" href="../">&larr; Back to my cars</Link>
      </div>
      <div className={styles.park}>
        <ArcadeButton>Push to Park</ArcadeButton>
      </div>
      <div className={styles.info}>
        <Image src={car.imageUrl || '/public/car-placeholder'} width={500} height={500} style={{ width: '100%', height: 'auto' }} alt={`${car.color} ${car.make} ${car.model}`} />
        <div className={styles.details}>
          <h2 className="h5 mb-3">Car Details</h2>
          <TextField
            className="mb-3"
            label="Make"
            value={car.make}
          />
          <TextField
            className="mb-3"
            label="Model"
            value={car.model}
          />
          <TextField
            className="mb-3"
            label="Color"
            value={car.color}
          />
          <TextField
            label="License Plate Number"
            value={car.licensePlateNo}
          />
        </div>
      </div>
    </div>
  )
}
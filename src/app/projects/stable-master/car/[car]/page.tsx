import styles from './page.module.css';
import { BackButton } from "@/components/Button/Back/BackButton";
import { ArcadeButton } from "@/components/Button/Arcade/ArcadeButton";
import TextField from "@/components/Form/TextField/TextField";
import { getRegisteredCarById } from "@/utils/car";



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
        <BackButton>&larr; Back to my cars</BackButton>
      </div>
      <div className={styles.park}>
        <ArcadeButton>Push to Park</ArcadeButton>
      </div>
      <div className={styles.info}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/100x67" width="auto" height="100%" alt={`${car.color} ${car.make} ${car.model}`} />
        </div>
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
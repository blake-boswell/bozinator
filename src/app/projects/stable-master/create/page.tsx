import styles from './page.module.css';
import Form from "./form";

export default function CreateCar() {

  return (
    <div>
      <h1>Add Your Car</h1>
      <p>Enter some basic car information. This will be used to fill out the parking form on your behalf.</p>
      <Form className={styles.form} />
    </div>
  )
}
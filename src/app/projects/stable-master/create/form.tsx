'use client';

import { useState, FormEvent, HTMLProps } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/Form/FormGroup";
import TextField from "@/components/Form/TextField/TextField";

export default function Form({ onSubmit, ...props }: HTMLProps<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false);

  async function addCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/stable-master/car/create', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    if (onSubmit) {
      onSubmit(e);
    }
  }

  return (
    <form {...props} onSubmit={addCar}>
      <Card>
        <Card.Header>Parking Information</Card.Header>
        <Card.Body>
          {/* <input type="checkbox" checked={isLoading} onChange={(e) => setIsLoading(e.currentTarget.checked)} /> */}
          <FormGroup className="mb-5">
            <TextField label="Make" name="make" id="make" isDisabled={isLoading} />
            <TextField label="Model" name="model" id="model" isDisabled={isLoading} />
            <TextField label="Color" name="color" id="color" isDisabled={isLoading} />
            <TextField label="License Plate Number" name="licensePlate" id="license-plate" isDisabled={isLoading} />
          </FormGroup>
          <Button type="submit" size="lg" className="w-100" variant="accent" loading={isLoading}>Add</Button>
        </Card.Body>
      </Card>
    </form>
  )
}
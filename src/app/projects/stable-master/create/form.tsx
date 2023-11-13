'use client';

import { useState, FormEvent, HTMLProps } from "react";
import type { ZodIssue } from 'zod';
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/Form/FormGroup";
import TextField from "@/components/Form/TextField/TextField";
import logger from "@/lib/pino";
import { RegisteredCar } from "@/types/car";

interface ValidationError {
  name: string; message: string
}

type StatusState = 'init' | 'validating' | 'loading' | 'success' | 'error';

export interface FormProps extends HTMLProps<HTMLFormElement> {
  onSubmitSuccess?: (responseBody: { car: RegisteredCar }) => void;
  onSubmitFailure?: (error: unknown) => void;
}

export default function Form({ onSubmit, onSubmitSuccess, onSubmitFailure, ...props }: FormProps) {
  const [status, setStatus] = useState<StatusState>('init');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  async function addCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let newValidationErrors: ValidationError[] = [];
    for (const [name, value] of formData.entries()) {
      if (!value.valueOf()) {
        newValidationErrors.push({
          name,
          message: 'Field cannot be empty',
        });
      }
    }

    if (newValidationErrors.length > 0) {
      console.log(newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    } else {
      setValidationErrors([]);
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/stable-master/car/create', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        const body = await response.json();

        setErrorMessage('');
        setStatus('success');
        if (onSubmitSuccess) {
          console.log(body);
          onSubmitSuccess(body);
        }
      } else {
        const body = await response.json();

        let message = body.message;
        if (body && 'validationErrors' in body) {
          newValidationErrors = (body.validationErrors as ZodIssue[]).map((issue) => {
            const name = issue.path.at(-1)?.toString() ?? 'unknown';
            const message = issue.message;
            return { name, message };
          })
          message = 'Check the fields below for error messages';
          setValidationErrors(newValidationErrors);
        }

        setErrorMessage(message);
        setStatus('error');
        if (onSubmitFailure) {
          onSubmitFailure({ status: response.status, message });
        }
      }
    } catch (err) {
      logger.error(err);
      setStatus('error');
      if (typeof err === 'string') {
        setErrorMessage(err);
      } else if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
          setErrorMessage(err.message);
        } else {
          setErrorMessage(err.toString());
        }
      }

      if (onSubmitFailure) {
        onSubmitFailure(err);
      }
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
          {status === 'error' && errorMessage ? (
            <div className="form__global-message form__global-message--error">{errorMessage}</div>
          ) : status === 'error' ? (
            <div className="form__global-message form__global-message--error">There was an error submitting your form.</div>
          ) : null}
          <FormGroup className="mb-5">
            <TextField label="Make" name="make" id="make" isDisabled={status === 'loading'} isRequired validationState={validationErrors.find((err) => err.name === 'make') ? 'invalid' : 'valid'} errorMessage={validationErrors.find((err) => err.name === 'make')?.message} />
            <TextField label="Model" name="model" id="model" isDisabled={status === 'loading'} isRequired validationState={validationErrors.find((err) => err.name === 'model') ? 'invalid' : 'valid'} errorMessage={validationErrors.find((err) => err.name === 'model')?.message} />
            <TextField label="Color" name="color" id="color" isDisabled={status === 'loading'} isRequired validationState={validationErrors.find((err) => err.name === 'color') ? 'invalid' : 'valid'} errorMessage={validationErrors.find((err) => err.name === 'color')?.message} />
            <TextField label="License Plate Number" name="licensePlate" id="license-plate" isDisabled={status === 'loading'} isRequired validationState={validationErrors.find((err) => err.name === 'licensePlate') ? 'invalid' : 'valid'} errorMessage={validationErrors.find((err) => err.name === 'licensePlate')?.message} />
          </FormGroup>
          <Button type="submit" size="lg" className="w-100" variant="accent" loading={status === 'loading'} >Add</Button>
        </Card.Body>
      </Card>
    </form>
  )
}
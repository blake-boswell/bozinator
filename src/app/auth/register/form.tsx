'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import TextField from '@/components/Form/TextField/TextField';
import FormGroup from '@/components/Form/FormGroup';
import Button from '@/components/Button';
import styles from './form.module.css';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      // Redirect to sign in page
      push('/auth/sign-in');
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h1 className={styles.header}>Register</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={onSubmitCredentials}>
          <FormGroup>
            <TextField className={styles.input} label="Email" name="email" type="email" placeholder="EX: zebratang1@gmail.com" />
            <TextField className={styles.input} label="Password" name="password" type="password" />
          </FormGroup>
          <Button className={styles.button} variant="accent" type="submit">Register</Button>
          <hr />
          <div className={styles.footer}>Already have an account? <Link href="/auth/sign-in">Sign in</Link></div>
        </form>
      </Card.Body>
    </Card>
  )
}
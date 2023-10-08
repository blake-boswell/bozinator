'use client';
import React, { useEffect, useState } from 'react';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Card from '@/components/Card';
import TextField from '@/components/Form/TextField/TextField';
import FormGroup from '@/components/Form/FormGroup';
import Button from '@/components/Button';
import styles from './form.module.css';

type SigninMode = null | 'magic-email' | 'credentials';

export default function SignInForm() {
  const { data: session, status } = useSession();
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<SigninMode>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getToken() {
      const token = await getCsrfToken();
      setCsrfToken(token);
    }

    getToken();
  }, []);

  if (status === 'authenticated') {
    return (
      <Card>
        <Card.Header>{session.user && `Hi ${session.user.name || session.user.email || 'there'}. `}</Card.Header>
        <Card.Body>
          <p>
            It looks like you&apos;re already signed in. Would you like to sign out?
          </p>
          <div>
            <Button className={styles.button} variant="accent" onPress={() => signOut()}>Sign out</Button>
          </div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Header>
        <h1 className={styles.header}>Sign in</h1>
      </Card.Header>
      <Card.Body>
        {mode === 'credentials' ? (
          <>
            <Button onPress={() => setMode(null)}>Back</Button>
            <form method="post" action="/api/auth/signin/credentials">
              <FormGroup>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <TextField className={styles.input} label="Email" name="email" type="email" placeholder="zebratang1@gmail.com" />
                <TextField className={styles.input} label="Password" name="password" type="password" />
              </FormGroup>
              <Button className={styles.button} variant="accent" type="submit">Sign in</Button>
              <hr />
              <div className={styles.footer}>Don&apos;t have an account? <Link href="/auth/register">Register</Link></div>
            </form>
          </>
        ) : mode === 'magic-email' ? (
          <>
            <Button onPress={() => setMode(null)}>Back</Button>
            <form>
              <FormGroup>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <TextField className={styles.input} value={email} onChange={setEmail} label="Email" name="email" type="email" placeholder="zebratang1@gmail.com" />
              </FormGroup>
              <Button className={styles.button} variant="accent" type="button" onPress={() => signIn('mailgun', { email })}>Email magic link</Button>
              <hr />
              <div className={styles.footer}>Don&apos;t have an account? <Link href="/auth/register">Register</Link></div>
            </form>
          </>
        ) : (
          <div>
            <Button className={styles.button} variant="accent" onPress={() => setMode('magic-email')}>Login with magic email link</Button>
            <Button className={styles.button} variant="accent" onPress={() => setMode('credentials')}>Login with password</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
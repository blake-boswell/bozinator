'use client';
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

function AuthForm() {
  const [email, setEmail] = useState('');
  const { data: session, status } = useSession();
  const user = session ? session.user : null;

  function handleSignIn() {
    signIn('mailgun', {
      username: email,
    });
  }
  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      {status === 'authenticated' && user ? (
        <div>
          <div>Hi {user.name}</div>
          <button onClick={handleSignOut} type="button">
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <h1>Sign in</h1>
          <label>
            Email
            <input
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </label>
          <button onClick={handleSignIn} type="button">
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthForm;

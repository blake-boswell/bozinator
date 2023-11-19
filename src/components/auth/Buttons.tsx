"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../Button";
import { ButtonProps } from "../Button/Button";
import { PressEvent } from "@react-types/shared";

export const LoginButton = ({ onPress, variant = 'accent', ...props}: ButtonProps) => {
  function handlePress(e: PressEvent) {
    signIn(undefined, { callbackUrl: '/' });
    if (onPress) {
      onPress(e);
    }
  }

  return (
    <Button variant={variant} onPress={handlePress} {...props}>
      Sign in
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};

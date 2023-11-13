'use client'

import { PressEvent } from "@react-types/shared";
import Button, { ButtonProps } from "../Button";

export function BackButton({ onPress, children = 'Back', ...props}: ButtonProps) {
  function handlePress(e: PressEvent) {
    if (onPress) {
      onPress(e);
    }
    history.back();
  };

  return (
    <Button onPress={handlePress} {...props}>{children}</Button>
  )
}
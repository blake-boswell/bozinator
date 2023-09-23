'use client'
import {useRef} from 'react';
import {useButton} from 'react-aria';
import type { AriaButtonProps } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  variant?: 'primary' | 'accent' | 'primary-outline' | 'accent-outline';
}

function Button({ className, variant, ...ariaProps}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { children } = ariaProps;
  const { buttonProps } = useButton(ariaProps, ref);

  return (
    <button className={`btn${variant ? ` btn-${variant}` : ''}${className ? ` ${className}` : ''}`} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}

export default Button;
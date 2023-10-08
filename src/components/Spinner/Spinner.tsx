import { HTMLProps } from 'react';
import styles from './spinner.module.css';

export interface SpinnerProps extends HTMLProps<HTMLSpanElement> {
  size?: number;
}

export default function Spinner({ size, style, className, ...props }: SpinnerProps) {
  return (
    <span className={`${styles.spinner}${className ? ` ${className}` : ''}`} style={{ width: size ?? 16, height: size ?? 16, ...style}} {...props} />
  )
}
'use client'

import Button, { ButtonProps } from "../Button";
import styles from './arcade-button.module.css';

export function ArcadeButton({ className, children, ...props}: ButtonProps) {

  return (
    <Button className={`${styles.btn}${className ? ` ${className}` : ''}`} {...props}>
      <div className={styles.face}>
        {children}
      </div>
    </Button>
  )
}
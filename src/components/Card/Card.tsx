import React from "react"
import styles from './card.module.css';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={`${styles.card}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}

export type CardHeaderProps = CardProps;

function Header({ children, className }: CardProps) {
  return (
    <div className={`${styles.header}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}

function Body({ children, className }: CardProps) {
  return (
    <div className={`${styles.body}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}

Card.Header = Header;
Card.Body = Body;

export default Card;
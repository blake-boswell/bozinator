'use client'
import {ReactNode, useRef} from 'react';
import {useButton} from 'react-aria';
import type { AriaButtonProps } from 'react-aria';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '../Spinner';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'primary-outline' | 'accent-outline';
  loading?: boolean;
  icon?: ReactNode;
}

function Button({ className, variant, size, loading, icon, ...ariaProps}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { children } = ariaProps;
  const { buttonProps } = useButton(ariaProps, ref);

  return (
    <button className={`btn${variant ? ` btn-${variant}` : ''}${size ? ` btn--${size}` : ''}${loading ? ` btn--loading` : ''}${icon ? ` btn--icon` : ''}${className ? ` ${className}` : ''}`} {...buttonProps} disabled={buttonProps.disabled || loading} ref={ref}>
      <AnimatePresence>
        {loading && !icon ? (
          <>
            <motion.div style={{ overflow: 'hidden' }} initial={{ width: 0, scale: 0 }} animate={{ width: 22, scale: 1 }} exit={{ width: 0, scale: 0 }}>
              <Spinner size={14} style={{ marginRight: 8}} />
            </motion.div>
          </>
        ) : loading ? (
          <Spinner size={14} style={{ marginRight: 8}} />
        ) : icon ? (
          <>
            {icon}
            <span style={{ marginRight: 8 }} />
          </>
        ) : null}
      </AnimatePresence>
      {children}
    </button>
  );
}

export default Button;
'use client'

import { useRef } from 'react';
import {useTextField} from 'react-aria';
import type {AriaTextFieldProps} from 'react-aria';
import Input from '../Input';
import Label from '../Label';
import styles from './text-field.module.css';

export interface TextFieldProps extends AriaTextFieldProps {
  className?: string;
}

function TextField({ className, ...props}: TextFieldProps) {
  let { label } = props;
  let ref = useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div className={`${styles.container} text-field${className ? ` ${className}` : ''}`}>
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default TextField;
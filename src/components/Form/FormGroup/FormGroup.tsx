export interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {
  gap?: number;
}

function FormGroup({ children, className, gap, style, ...rest}: FormGroupProps) {
  return (
    <div className={`form-group${className ? ` ${className}` : ''}`} style={{ ...style, gap: gap ?? style?.gap }} {...rest}>
      {children}
    </div>
  )
}

export default FormGroup;
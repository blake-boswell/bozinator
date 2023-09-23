function FormGroup({ children, className, ...rest}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`form-group${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </div>
  )
}

export default FormGroup;
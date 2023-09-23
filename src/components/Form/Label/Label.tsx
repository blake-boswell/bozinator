function Label ({ className, children, ...rest}: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label className={`label${className ? ` ${className}` : ''}`} {...rest}>{children}</label>
  )
}

export default Label;
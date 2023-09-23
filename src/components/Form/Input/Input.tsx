function Input ({ className, ...rest}: React.HTMLProps<HTMLInputElement>) {
  return (
    <input className={`input${className ? ` ${className}` : ''}`} {...rest} />
  )
}

export default Input;
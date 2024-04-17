function Input({
  placeHolder,
  type,
  className,
  label,
  labelClass,
  containerClass,
  value,
  onChange,
  id,
}) {
  return (
    <div className={containerClass}>
      {label && <label className={labelClass}>{label}</label>}
      <input
        type={type}
        placeholder={placeHolder}
        className={className}
        onChange={onChange}
        value={value ?? ""}
        id={id}
      />
    </div>
  );
}

export default Input;

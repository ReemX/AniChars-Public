function LoginField({ children, type, disabled, onChange, value, id }) {
  return (
    <>
      <label className="mb-2 font-semibold">{children}</label>
      <input
        id={id}
        type={type}
        className="rounded-full border border-gray-300 px-2 text-gray-500 outline-none"
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default LoginField;

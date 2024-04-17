function Header({ children }) {
  return (
    <h1 className="mb-6 font-nova-square text-4xl font-bold uppercase text-indigo-600 underline dark:text-blue-700">
      {children}
    </h1>
  );
}

export default Header;

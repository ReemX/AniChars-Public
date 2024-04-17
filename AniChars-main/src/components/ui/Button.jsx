import { Link } from "react-router-dom";

function Button({ onClick, to, className, disabled, children, type }) {
  return (
    <>
      {!to ? (
        <button
          type={type}
          onClick={onClick}
          className={className}
          disabled={disabled}
        >
          {children}
        </button>
      ) : (
        <Link to={to} className={className} disabled={disabled}>
          {children}
        </Link>
      )}
    </>
  );
}

export default Button;

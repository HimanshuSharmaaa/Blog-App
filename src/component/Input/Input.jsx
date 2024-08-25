import React, { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={className}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default Input;
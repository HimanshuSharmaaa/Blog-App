import React from "react";
function Button({
  children,
  type = "button",
  bgColor = "black",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button className="button" type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
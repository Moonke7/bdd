import React from "react";
import "../styles/Input.css"

export default function Input({ value, onchange, placeholder}) {
  const Search01Icon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#a67350"}
      fill={"none"}
      {...props}
    >
      <path
        d="M17.5 17.5L22 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="input">
      <div className="searchIcon">
        <Search01Icon />
      </div>
      <input type="text" value={value} onChange={(e) => onchange(e)} placeholder={placeholder}/>
    </div>
  );
}

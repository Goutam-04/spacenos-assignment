import React from "react";

export function Container(props) {
  return (
    <div
      className={`container px-4 mx-auto xl:px-0  ${
        props.className ? props.className : ""
      }`}>
      {props.children}
    </div>
  );
}


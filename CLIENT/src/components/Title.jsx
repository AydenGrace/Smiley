import React from "react";

export default function Title({children}) {
  return (
    <h1 className="text-[40px] md:text-[56px] leading-[120%] tracking-[-0.4px] md:tracking-[-0.56px] font-(family-name:--title-font-family)">
      {children}
    </h1>
  );
}

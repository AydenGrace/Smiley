import React from "react";

export default function TitleTwo({children}) {
  return (
    <h1 className="text-[40px] leading-[120%] tracking-[-0.4px] font-(family-name:--title-font-family)">
      {children}
    </h1>
  );
}

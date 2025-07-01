import React from "react";

export default function TitleThree({children}) {
  return (
    <h1 className="text-[18px] md:text-[24px] leading-[140%] tracking-[-0.24px] font-(family-name:--title-font-family)">
      {children}
    </h1>
  );
}

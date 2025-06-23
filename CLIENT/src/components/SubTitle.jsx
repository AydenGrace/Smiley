import React from "react";

export default function SubTitle({children}) {
  return (
    <p className="text-[16px] md:text-[18px] leading-[150%] font-(family-name:--font-display)">
      {children}
    </p>
  );
}

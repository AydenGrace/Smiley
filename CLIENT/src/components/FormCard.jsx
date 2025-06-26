import React from "react";

export default function FormCard({children}) {
  return (
    <div className="bg-white flex p-4 flex-col items-center border-[1px] border-black/20 shadow-md rounded-[20px] max-w-[340px] min-w-[335px]">
      {children}
    </div>
  );
}

import React from "react";

export default function ImageBlock({url}) {
  return (
    <div
      className="min-w-[205px] min-h-[205px] md:min-w-[300px] md:min-h-[300px] lg:min-w-[415px] lg:min-h-[415px] bg-center bg-cover"
      style={{backgroundImage: `url(${url})`}}
    ></div>
  );
}

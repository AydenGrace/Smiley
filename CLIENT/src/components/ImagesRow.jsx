import React from "react";
import ImageBlock from "./ImageBlock";

export default function ImagesRow({images, left = "-500px"}) {
  return (
    <div
      className={`absolute left-[${left}] flex items-start gap-4`}
      style={{left: left}}
    >
      {images.map((img) => (
        <ImageBlock url={img.url} />
      ))}
    </div>
  );
}

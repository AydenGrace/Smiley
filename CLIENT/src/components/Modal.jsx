import React from "react";

export default function Modal({open, closeModal = () => {}}) {
  return (
    <div
      className={`transition delay-150 duration-300 ease-in-out absolute top-0 left-0 bg-black/20 flex justify-center items-center w-full h-full z-60 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal}
    ></div>
  );
}

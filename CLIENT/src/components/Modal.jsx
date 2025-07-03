import React from "react";
import {RxCross2} from "react-icons/rx";

export default function Modal({open, closeModal = () => {}, children}) {
  return (
    <div
      className={`transition delay-150 duration-300 ease-in-out fixed top-0 left-0 bg-black/30 flex justify-center items-center w-full h-full z-60 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div
        className="shadow-xl bg-white z-70 rounded-2xl p-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end w-full">
          <RxCross2
            size={24}
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

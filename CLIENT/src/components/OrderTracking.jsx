import React from "react";
import {HiOutlineShoppingBag} from "react-icons/hi";
import {FaQuestion} from "react-icons/fa";

export default function OrderTracking({histories}) {
  const getCicle = (content) => {
    const lowCont = content.toLowerCase();
    if (lowCont.includes("payée et validée"))
      return (
        <div className="w-15 h-15 rounded-[100px] flex justify-center items-center bg-[#BBE9BF] text-primary">
          <HiOutlineShoppingBag size={32} />
        </div>
      );
    if (lowCont.includes("enregistrée"))
      return (
        <div className="w-15 h-15 rounded-[100px] flex justify-center items-center bg-[#F8ECBD] text-[#FF9D00]">
          <HiOutlineShoppingBag size={32} />
        </div>
      );

    // NOT FOUND

    return (
      <div className="w-15 h-15 rounded-[100px] flex justify-center items-center bg-gray-300 text-gray-600">
        <FaQuestion size={32} />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col relative ">
      {histories.reverse().map((hist, idx) => (
        <div
          className="flex p-2.5 items-center gap-2.5 z-10"
          key={`hist_${idx}`}
        >
          <div className="min-w-15 min-h-15">{getCicle(hist.content)}</div>
          <div className="flex flex-col">
            <p className="font-medium">{hist.content}</p>
            <p className="opacity-60">
              {new Date(hist.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              à {new Date(hist.createdAt).toLocaleTimeString("fr-FR")}
            </p>
          </div>
        </div>
      ))}
      <div className="absolute w-0.5 bg-gray-200 h-[calc(100%-64px)] top-8 left-[39px] z-0"></div>
    </div>
  );
}

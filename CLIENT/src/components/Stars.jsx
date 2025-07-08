import React from "react";
import {FaStar, FaRegStarHalfStroke, FaRegStar} from "react-icons/fa6";

export default function Stars({nb = 0}) {
  return (
    <div className="flex items-center gap-1 text-yellow">
      {nb > 0 && nb < 1 ? (
        <FaRegStarHalfStroke size={24} />
      ) : nb < 1 ? (
        <FaRegStar size={24} />
      ) : (
        <FaStar size={24} />
      )}
      {nb > 1 && nb < 2 ? (
        <FaRegStarHalfStroke size={24} />
      ) : nb < 2 ? (
        <FaRegStar size={24} />
      ) : (
        <FaStar size={24} />
      )}
      {nb > 2 && nb < 3 ? (
        <FaRegStarHalfStroke size={24} />
      ) : nb < 3 ? (
        <FaRegStar size={24} />
      ) : (
        <FaStar size={24} />
      )}
      {nb > 3 && nb < 4 ? (
        <FaRegStarHalfStroke size={24} />
      ) : nb < 4 ? (
        <FaRegStar size={24} />
      ) : (
        <FaStar size={24} />
      )}
      {nb > 4 && nb < 5 ? (
        <FaRegStarHalfStroke size={24} />
      ) : nb < 5 ? (
        <FaRegStar size={24} />
      ) : (
        <FaStar size={24} />
      )}
    </div>
  );
}

import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function Counter({
  value = 0,
  addToValue = () => {},
  minusToValue = () => {},
  setValue = () => {},
  maxValue = 5,
}) {
  const verifyNumber = (e) => {
    if (isNaN(e)) return;
    if (e < 1) return;
    if (e > maxValue) return setValue(maxValue);

    return setValue(e);
  };

  const verifyAddToNumber = (e) => {
    if (e !== maxValue) addToValue(e);
  };
  const verifyMinusToNumber = (e) => {
    if (e !== 1) minusToValue(e);
  };
  return (
    <div className="flex">
      {/* COUNTER */}
      <input
        className="w-[50px] min-h-[20px] text-center !rounded-r-none"
        value={value}
        onChange={(e) => verifyNumber(e.target.value)}
      ></input>
      <div className="flex flex-col h-[44px] bg-white rounded-r-lg w-[40px] border-1 border-l-0 border-black/10 overflow-hidden">
        <div
          className="flex flex-1 items-center justify-center text-center cursor-pointer border-b-1 border-black/10 hover:text-primary"
          onClick={(e) => verifyAddToNumber(value)}
        >
          <FaChevronUp size={14} />
        </div>
        <div
          className="flex flex-1 items-center justify-center text-center cursor-pointer hover:text-primary"
          onClick={(e) => verifyMinusToNumber(value)}
        >
          <FaChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

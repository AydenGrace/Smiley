import React from "react";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";
import {FiPlus, FiMinus} from "react-icons/fi";

export default function Counter({
  value = 0,
  addToValue = () => {},
  minusToValue = () => {},
  setValue = () => {},
  maxValue = 5,
  minValue = 1,
  style = "chevron",
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
    if (e !== minValue) minusToValue(e);
  };
  return (
    <div className="flex items-center">
      {style === "minus-plus" ? (
        <>
          <div
            className="flex cursor-pointer text-center text-black hover:text-primary hover:bg-bg items-center justify-center w-[50px] h-[50px] bg-white rounded-l-[10px] border-[0.5px] border-black/20"
            onClick={(e) => verifyMinusToNumber(value)}
          >
            <FiMinus size={14} />
          </div>
          <input
            className="w-[50px] h-[50px] max-h-[50px] text-center !rounded-none"
            value={value}
            onChange={(e) => verifyNumber(e.target.value)}
          ></input>
          <div
            className="flex cursor-pointer text-center text-black hover:text-primary hover:bg-bg items-center justify-center w-[50px] h-[50px] bg-white rounded-r-[10px] border-[0.5px] border-black/20"
            onClick={(e) => verifyAddToNumber(value)}
          >
            <FiPlus size={14} />
          </div>
        </>
      ) : (
        <>
          <input
            className="w-[50px] min-h-[20px] max-h-[45px] text-center !rounded-r-none"
            value={value}
            onChange={(e) => verifyNumber(e.target.value)}
          ></input>
          <div className="flex flex-col h-[44px] bg-white rounded-r-lg w-[40px] border-1 border-l-0 border-black/10 overflow-hidden">
            {/* PLUS */}
            <div
              className="flex flex-1 items-center justify-center text-center cursor-pointer border-b-1 border-black/10 hover:text-primary"
              onClick={(e) => verifyAddToNumber(value)}
            >
              <FaChevronUp size={14} />
            </div>
            {/* MINUS */}
            <div
              className="flex flex-1 items-center justify-center text-center cursor-pointer hover:text-primary"
              onClick={(e) => verifyMinusToNumber(value)}
            >
              <FaChevronDown size={14} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

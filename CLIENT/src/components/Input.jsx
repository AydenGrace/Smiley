import React, {useEffect, useMemo, useState} from "react";
import Tooltip from "./Tooltip";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

export default function Input({
  label = null,
  type = "text",
  hasTooltip = false,
  placeholder = "",
  isTextArea = false,
  rows = 5,
  getValueOnChange = () => {},
}) {
  const [value, setValue] = useState("");
  const [localType, setlocalType] = useState(type);
  const RANDOM = Math.floor(Math.random() * 10000);

  useEffect(() => {
    getValueOnChange(value);
  }, [value]);
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex items-center gap-2">
          <label htmlFor={`${type}_${RANDOM}`} className="font-semibold">
            {label}
          </label>
          {hasTooltip && <Tooltip textToVerify={value} />}
        </div>
      )}
      {isTextArea ? (
        <textarea
          id={`${type}_${RANDOM}`}
          className="min-h-[70px]"
          placeholder={placeholder}
          rows={rows}
        ></textarea>
      ) : (
        <div className="relative">
          <input
            id={`${type}_${RANDOM}`}
            type={localType}
            value={value}
            className={`w-full`}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
          {type === "password" && (
            <div className="absolute top-3.5 right-4 cursor-pointer text-primary">
              {localType === "password" ? (
                <FaRegEye size={18} onClick={() => setlocalType("text")} />
              ) : (
                <FaRegEyeSlash
                  size={18}
                  onClick={() => setlocalType("password")}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

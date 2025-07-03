import React, {useEffect, useMemo, useRef, useState} from "react";
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
  yup = null,
  yupError = null,
  disabled = false,
  defautlValue = "",
}) {
  const [value, setValue] = useState(defautlValue);
  const [localType, setlocalType] = useState(type);
  const RANDOM = Math.floor(Math.random() * 10000);

  useEffect(() => {
    getValueOnChange(value);
  }, [value]);

  useEffect(() => {
    setValue(defautlValue);
  }, [defautlValue]);

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
        yup ? (
          <textarea
            {...yup}
            id={`${type}_${RANDOM}`}
            className={`min-h-[70px]  ${disabled ? "opacity-50" : ""}`}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
          ></textarea>
        ) : (
          <textarea
            id={`${type}_${RANDOM}`}
            className={`min-h-[70px]  ${disabled ? "opacity-50" : ""}`}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
          ></textarea>
        )
      ) : (
        <div className="relative">
          {yup ? (
            <input
              {...yup}
              id={`${type}_${RANDOM}`}
              type={localType}
              className={`w-full  ${disabled ? "opacity-50" : ""}`}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <input
              id={`${type}_${RANDOM}`}
              type={localType}
              value={value}
              className={`w-full ${disabled ? "opacity-50" : ""}`}
              placeholder={placeholder}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled}
            />
          )}

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
      {yupError && <p className="text-red-500 text-xs">{yupError.message}</p>}
    </div>
  );
}

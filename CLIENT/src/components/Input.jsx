import React, {useState} from "react";
import Tooltip from "./Tooltip";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

export default function Input({
  label = null,
  type = "text",
  hasTooltip = false,
  placeholder = "",
  getValueOnChange = () => {},
}) {
  const [value, setValue] = useState("");
  const [localType, setlocalType] = useState(type);

  const handleChange = (e) => {
    getValueOnChange(e.target.value);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex items-center gap-2">
          <p className="font-semibold">{label}</p>
          {hasTooltip && <Tooltip textToVerify={value} />}
        </div>
      )}
      <div className="relative">
        <input
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
    </div>
  );
}

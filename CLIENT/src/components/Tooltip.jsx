import React, {useEffect, useState} from "react";
import {IoInformationCircleSharp} from "react-icons/io5";
import {GoDotFill} from "react-icons/go";

export default function Tooltip({
  textToVerify,
  MIN_CHAR = 12,
  MIN_CAPITAL = 1,
  MIN_MINUSCULE = 1,
  MIN_NUMBER = 1,
  MIN_SPECIAL = 1,
}) {
  //Booleans to color change
  const [nbChar, setNbChar] = useState(false);
  const [capital, setCapital] = useState(false);
  const [minuscule, setMinuscule] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);

  const REGEX_SPECIAL =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  const REGEX_CAPITAL = /[A-Z]/g;
  const REGEX_MINUSCULE = /[a-z]/g;
  const REGEX_NUMBER = /[1-9]/g;

  const Reset = () => {
    setNbChar(false);
    setCapital(false);
    setMinuscule(false);
    setNumber(false);
    setSpecial(false);
  };

  //Verification
  const Verify = (text) => {
    Reset();
    const tmp = text.trim();

    const nbSpe = tmp.match(REGEX_SPECIAL);
    const nbCap = tmp.match(REGEX_CAPITAL);
    const nbMin = tmp.match(REGEX_MINUSCULE);
    const nbNum = tmp.match(REGEX_NUMBER);

    console.log(nbMin);

    //Verify number of characters
    setNbChar(tmp.length >= MIN_CHAR);
    setSpecial(nbSpe ? nbSpe.length >= MIN_SPECIAL : false);
    setMinuscule(nbMin ? nbMin.length >= MIN_MINUSCULE : false);
    setCapital(nbCap ? nbCap.length >= MIN_CAPITAL : false);
    setNumber(nbNum ? nbNum.length >= MIN_NUMBER : false);
  };

  useEffect(() => {
    Verify(textToVerify);
  }, [textToVerify]);

  return (
    <div className="relative inline-block group">
      <div className="text-primary text-xl">
        <IoInformationCircleSharp />
      </div>
      <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
        <div className="relative p-4 bg-gradient-to-br from-bg to-white backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_0_30px_rgba(12,150,25,0.15)]">
          <div className="flex items-center gap-3 mb-2">
            <div v="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
                  clipRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="text-sm font-semibold ">Normes de mot de passe</h3>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-900">
              Votre mot de passe doit contenir au minimum :
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {nbChar ? (
                <svg
                  viewBox="0 0 20 20"
                  fill={nbChar ? "#0c9619" : "currentColor"}
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <div className="mr-1">
                  <GoDotFill fill="currentColor" />
                </div>
              )}

              <span className={`${nbChar && "text-[#0c9619]"}`}>
                {MIN_CHAR} caractères
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {capital ? (
                <svg
                  viewBox="0 0 20 20"
                  fill={capital ? "#0c9619" : "currentColor"}
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <div className="mr-1">
                  <GoDotFill fill="currentColor" />
                </div>
              )}
              <span className={`${capital && "text-[#0c9619]"}`}>
                {MIN_CAPITAL} lettre capitale (A,B, ..)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {minuscule ? (
                <svg
                  viewBox="0 0 20 20"
                  fill={minuscule ? "#0c9619" : "currentColor"}
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <div className="mr-1">
                  <GoDotFill fill="currentColor" />
                </div>
              )}
              <span className={`${minuscule && "text-[#0c9619]"}`}>
                {MIN_MINUSCULE} lettre minuscule (a, b, ...)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {number ? (
                <svg
                  viewBox="0 0 20 20"
                  fill={number ? "#0c9619" : "currentColor"}
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <div className="mr-1">
                  <GoDotFill fill="currentColor" />
                </div>
              )}
              <span className={`${number && "text-[#0c9619]"}`}>
                {MIN_NUMBER} chiffre (1, 2, ...)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {special ? (
                <svg
                  viewBox="0 0 20 20"
                  fill={special ? "#0c9619" : "currentColor"}
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <div className="mr-1">
                  <GoDotFill fill="currentColor" />
                </div>
              )}
              <span className={`${special && "text-[#0c9619]"}`}>
                {MIN_SPECIAL} caractère spécial (#, @, ...)
              </span>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50"></div>

          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
        </div>
      </div>
    </div>
  );
}

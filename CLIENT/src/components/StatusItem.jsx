import React from "react";

export default function StatusItem({status}) {
  const getColor = () => {
    switch (status.title.toLowerCase()) {
      case "en attente":
        return "#FF9D00";
      case "en livraison":
        return "#0A92B1";
      case "reçue":
        return "#0C9619";
      case "refusée":
      default:
        return "#DC2626";
    }
  };

  const getCircle = () => {
    switch (status.title.toLowerCase()) {
      case "en attente":
        return (
          <div className=" rounded-2xl w-[12px] h-[12px] border-2 border-[#FF9D00]"></div>
        );
      case "en livraison":
        return (
          <div className="rounded-2xl w-[12px] h-[12px] border-2 border-[#0A92B1]"></div>
        );
      case "reçue":
        return (
          <div className="rounded-2xl w-[12px] h-[12px] border-2 bg-[#0C9619] border-[#0C9619]"></div>
        );
      case "refusée":
      default:
        return (
          <div className="rounded-2xl w-[12px] h-[12px] border-2 bg-[#DC2626] border-[#DC2626]"></div>
        );
    }
  };
  return (
    <div className="flex gap-1 items-center" style={{color: getColor()}}>
      {getCircle()}
      <p className="font-medium">{status.title}</p>
    </div>
  );
}

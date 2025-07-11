import React from "react";

export default function CartItem({cartItem}) {
  return (
    <div className="flex w-full p-2.5 items-center self-stretch border-b-[0.5px] border-b-black/20 gap-4">
      {/* IMG */}
      <div className="w-20 h-20 flex">
        <img
          src={cartItem.article.medias.find((im) => im.is_main === true).url}
          alt={cartItem.article.title}
          className="aspect-square object-cover object-center"
        />
      </div>
      {/* TITLE + Total Price */}
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="font-medium text-[20px]">{cartItem.article.title}</h2>
        <p className="opacity-70">{cartItem.article.price * cartItem.nb} €</p>
      </div>
      {/* BTNs */}
      <div className="flex flex-1 justify-end gap-4"></div>
    </div>
  );
}

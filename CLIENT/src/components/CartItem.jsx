import React, {useContext} from "react";
import Counter from "./Counter";
import {CartContext} from "../context/CartContext";
import {FaRegTrashAlt} from "react-icons/fa";

export default function CartItem({cartItem}) {
  const {changeNbOfAnArticle, removeToCart} = useContext(CartContext);
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
      <div className="flex flex-1 justify-end gap-4 items-center">
        <Counter
          style="minus-plus"
          value={cartItem.nb}
          addToValue={() =>
            changeNbOfAnArticle(cartItem.article, cartItem.nb + 1)
          }
          setValue={(e) => changeNbOfAnArticle(cartItem.article, e)}
          minusToValue={() =>
            changeNbOfAnArticle(cartItem.article, cartItem.nb - 1)
          }
          maxValue={cartItem.article.stock}
          minValue={0}
        />
        <div
          className="cursor-pointer hover:text-red-600"
          onClick={() => removeToCart(cartItem.article)}
        >
          <FaRegTrashAlt size={24} />
        </div>
      </div>
    </div>
  );
}

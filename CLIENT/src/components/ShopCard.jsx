import React from "react";
import Button from "./Button";
import {AiOutlineShopping} from "react-icons/ai";
import {TbFlameFilled} from "react-icons/tb";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CartContext} from "../context/CartContext";

export default function ShopCard({
  product = {
    _id: "68554bcfa47fa7c715b4dbbe",
    title: "Test 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,",
    stars: 0,
    price: 37.5,
    is_featured: false,
    type: {
      _id: "68554ae5a25ed5041841f31a",
      name: "CARD",
    },
    medias: [
      {
        url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-1.webp",
        is_main: true,
        _id: "68554bcfa47fa7c715b4dbbf",
      },
      {
        url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-1.webp",
        is_main: false,
        _id: "68554bcfa47fa7c715b4dbc0",
      },
      {
        url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-1.webp",
        is_main: false,
        _id: "68554bcfa47fa7c715b4dbc1",
      },
    ],
  },
  staticSize = false,
}) {
  const {addToCart} = useContext(CartContext);
  const imgURL = product.medias.find((item) => item.is_main === true).url;

  const desc =
    product.desc.length > 60
      ? product.desc.substring(0, 60) + "..."
      : product.desc;

  return (
    <Link
      to={`/details/${product._id}`}
      className={`relative flex flex-col rounded-[10px] aspect-[56/75] overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        product.is_featured && !staticSize
          ? "w-[335px] md:w-[440px] md:max-w-1/3"
          : "w-[335px]"
      }`}
    >
      <div className="relative w-full flex flex-1 max-h-[70%]  cursor-pointer">
        {product.is_featured && (
          <div className="absolute top-4 left-4 bg-primary rounded flex gap-1 px-2 py-0.5 items-center text-white cursor-default z-20">
            <TbFlameFilled size={18} />
            <p className="font-semibold">En Vedette</p>
          </div>
        )}
        <div
          className="flew flex-1 bg-center bg-cover hover:scale-120 transition-all duration-750 ease-in-out"
          style={{backgroundImage: `url(${imgURL})`}}
        ></div>
      </div>
      <div className="flex w-full flex-col p-4 pt-2.5 bg-white z-20 min-h-[139px]">
        <div className="flex justify-between items-center cursor-default">
          <h3 className="text-2xl">{product.title}</h3>
          <h3 className="text-2xl text-primary">{product.price} €</h3>
        </div>
        <div className="w-full max-h-[43px] h-[43px] overflow-hidden text-clip">
          <p className="opacity-50 cursor-default leading-4.5 text-ellipsis">
            {desc}
          </p>
        </div>
        <Button
          onClick={() => addToCart(product, 1)}
          icon={<AiOutlineShopping size={24} />}
          text="Ajouter au panier"
          colored
          stopPropagation
        />
      </div>
    </Link>
  );
}

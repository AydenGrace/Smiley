import React from "react";
import {useContext} from "react";
import {CartContext} from "../context/CartContext";
import Title from "../components/Title";
import CartItem from "../components/CartItem";
import TitleThree from "../components/TitleThree";
import Button from "../components/Button";
import {Link} from "react-router-dom";

export default function Cart() {
  const {cart, getTotalPrice} = useContext(CartContext);
  console.log(cart);

  return (
    <div className="w-full flex flex-col min-h-screen pt-[77px] px-4 sm:px-[10%]">
      <div className="w-full flex flex-col py-8 gap-8">
        <Title>Panier</Title>
        <div className="flex flex-col w-full rounded-[10px] bg-white shadow-lg overflow-hidden">
          {cart.map((item, idx) => (
            <CartItem cartItem={item} key={`CartItem_${idx}`} />
          ))}
        </div>
        <div className="w-full p-4 gap-4 flex flex-col rounded-[10px] bg-white shadow-lg overflow-hidden">
          <div className="flex w-full justify-between">
            <TitleThree>
              <span className="text-primary font-medium">Total</span>
            </TitleThree>
            <TitleThree>
              <span className="font-medium">{getTotalPrice()} €</span>
            </TitleThree>
          </div>
          <Link to={"/validate-cart"}>
            <Button isFull colored isWidthFull text="Valider mon panier" />
          </Link>
        </div>
      </div>
    </div>
  );
}

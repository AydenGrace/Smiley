import React, { useContext, useState } from "react";
import Title from "../components/Title";
import TitleTwo from "../components/TitleTwo";
import TitleThree from "../components/TitleThree";
import Input from "../components/Input";
import Button from "../components/Button";
import { CartContext } from "../context/CartContext";
import Counter from "../components/Counter";

export default function Cart() {
  const [fact, setFact] = useState(false);
  const { cart, getTotalPrice } = useContext(CartContext);
  return (
    <div className="flex w-full min-h-screen pt-[77px] px-[20%]">
      <div className="flex w-full py-10 flex-col gap-2.5">
        <TitleTwo>Validation du panier</TitleTwo>
        <div className="flex flex-col-reverse md:flex-row w-full gap-4 pt-2.5">
          {/* Formulaire */}
          <section className="flex w-full flex-col gap-2.5">
            <form action="flex w-full flex-col gap-2.5">
              <TitleThree>
                Informations de{" "}
                <span className="text-primary font-semibold">livraison</span>
              </TitleThree>
              <Input label={"Nom"} placeholder="John Doe" type="text" />
              <Input
                label={"Email"}
                placeholder="john.doe@example.com"
                type="email"
              />
              <Input
                label={"Adresse"}
                placeholder="22 rue du Sourire"
                type="text"
              />
              <div className="flex w-full gap-2.5">
                <Input label={"Ville"} placeholder="Smile City" type="text" />
                <Input label={"Code postal"} placeholder="1337" type="text" />
              </div>{" "}
              <Input label={"Pays"} placeholder="France" type="text" />
            </form>
            <div className="flex w-full gap-2.5">
              <input
                value={fact}
                onChange={(e) => {
                  setFact(e.target.checked);
                }}
                type="checkbox"
                id="seeFact_checkbox"
                className="!rounded-[5px] mt-1 relative peer appearance-none min-w-4 max-w-4 max-h-4 min-h-4 border border-primary cursor-pointer text-bg checked:bg-secondary checked:!bg-primary before:checked:content-[2714] before:checked:absolute before:checked:right-[1px] before:checked:top-[-5px] before:checked:text-primary check"
              />
              <label htmlFor="seeFact_checkbox" className="pt-1">
                Mes informations de facturation sont différentes des
                informations de livraison.
              </label>
            </div>
            {fact && (
              <form action="flex w-full flex-col gap-2.5">
                <TitleThree>
                  Informations de{" "}
                  <span className="text-primary font-semibold">
                    facturation
                  </span>
                </TitleThree>
                <Input label={"Nom"} placeholder="John Doe" type="text" />
                <Input
                  label={"Email"}
                  placeholder="john.doe@example.com"
                  type="email"
                />
                <Input
                  label={"Adresse"}
                  placeholder="22 rue du Sourire"
                  type="text"
                />
                <div className="flex w-full gap-2.5">
                  <Input label={"Ville"} placeholder="Smile City" type="text" />
                  <Input label={"Code postal"} placeholder="1337" type="text" />
                </div>{" "}
                <Input label={"Pays"} placeholder="France" type="text" />
              </form>
            )}
            <Button colored isFull text="Procéder au paiement" />
          </section>

          {/* Cart */}
          <section className="flex w-full flex-col h-full relative">
            <div className="flex w-full flex-col sticky top-20 gap-2.5">
              <TitleThree>Résumé du Panier</TitleThree>
              <div className="bg-white w-full flex flex-col p-5 gap-2.5">
                {cart.map((item, idx) => (
                  <div
                    className="flex justify-between items-center"
                    key={`cart_item_${idx}`}
                  >
                    <div className="flex gap-2.5 items-center">
                      <p>{item.article.title} </p>
                      <Counter value={item.nb} />
                    </div>
                    <p className="font-medium">
                      {item.article.price * item.nb} €
                    </p>
                  </div>
                ))}
                <hr className="border-b-1 w-full border-b-black/5 opacity-20" />
                <div className="flex justify-between">
                  <p className="font-semibold text-xl">Total</p>
                  <p className="font-semibold text-xl">{getTotalPrice()} €</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

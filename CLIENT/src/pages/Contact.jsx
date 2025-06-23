import React from "react";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Input from "../components/Input";
import {Link} from "react-router-dom";
import Button from "../components/Button";

export default function Contact() {
  return (
    <div className="w-full min-h-screen pt-[70px] flex items-center justify-center">
      <div className="px-4 w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center items-center text-center gap-20">
        <div className="flex flex-col gap-6">
          <Title>
            Restons en <span className="text-primary font-medium">Contact</span>
          </Title>
          <SubTitle>
            Vous souhaitez nous contacter pour avoir des informations ? Signaler
            un problème ? ou encore nous envoyer des mots doux ? N’hésitez pas à
            utiliser le formulaire ci-dessous !
          </SubTitle>
        </div>
        <form className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-4 flex-col sm:flex-row">
            <div className="w-full max-w-[640px]">
              <Input label={"Votre nom"} type="text" placeholder="John Doe" />
            </div>
            <div className="w-full max-w-[640px]">
              <Input
                label={"Votre email"}
                type="text"
                placeholder="john.doe@gmail.com"
              />
            </div>
          </div>
          <Input
            label={"Objet du message"}
            type="text"
            placeholder="Envoi de mots doux"
          />
          <Input
            label={"Message"}
            isTextArea
            placeholder="Vous qui lisez ce message, vous êtes magnifique ! ... J’ai vu votre sourire !"
          />
          <div className="w-full flex gap-2 items-center text-left">
            <input
              type="checkbox"
              id="contact_rgpd"
              className="!rounded-[5px] mt-1 relative peer appearance-none min-w-4 max-w-4 maw-h-4 min-h-4 border border-primary cursor-pointer text-bg checked:bg-secondary checked:!bg-primary before:checked:content-[2714] before:checked:absolute before:checked:right-[1px] before:checked:top-[-5px] before:checked:text-primary check"
            />
            <label htmlFor="contact_rgpd" className="pt-1">
              En continuant, vous validez avoir lu et accepté les 
              <Link className="underline text-primary">
                politiques de confidentialité
              </Link>
              .
            </label>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button text="Envoyer mon message" isFull />
          </div>
        </form>
      </div>
    </div>
  );
}

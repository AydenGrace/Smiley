import React from "react";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Input from "../components/Input";

export default function Contact() {
  return (
    <div className="w-full min-h-screen pt-[70px] flex items-center justify-center">
      <div className="w-1/2 flex flex-col justify-center items-center text-center gap-20">
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
        <form className="w-full flex flex-col">
          <div className="w-full flex">
            <div className="w-full max-w-[640px]">
              <Input label={"Mot de passe"} type="text" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

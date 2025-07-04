import React from "react";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Input from "../components/Input";
import {Link} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {sendContactForm} from "../apis/contact.api";
import {toast} from "react-hot-toast";

export default function Contact() {
  const schema = yup.object({
    fullname: yup.string().required("Veuillez indiquer votre nom."),
    email: yup
      .string()
      .required("Veuillez indiquer une adresse email.")
      .email("Veuillez indiquer une adresse email valide."),
    subject: yup.string().required("Veuillez indiquer un objet de message."),
    message: yup.string().required("Veuillez le contenu de votre message."),
    rgpd: yup.bool().required("Veuillez accepter les conditions"),
  });
  const defaultValues = {
    email: "",
    fullname: "",
    rgpd: false,
    subject: "",
    message: "",
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const submit = async (values) => {
    const response = await sendContactForm(values);
    if (response?.ok) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full min-h-screen pt-[70px] flex items-center justify-center">
      <div className="px-4 w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center items-center text-center gap-20">
        <div className="flex flex-col gap-6">
          <Title>
            Restons en <span className="text-primary font-medium">Contact</span>
          </Title>
          <SubTitle>
            Vous souhaitez nous contacter pour avoir des informations ? Signaler
            un problème ? Ou encore nous envoyer des mots doux ? N’hésitez pas à
            utiliser le formulaire ci-dessous !
          </SubTitle>
        </div>
        <form
          className="w-full flex flex-col gap-4 mb-4"
          onSubmit={handleSubmit(submit)}
        >
          <div className="w-full flex gap-4 flex-col sm:flex-row">
            <div className="w-full max-w-[640px]">
              <Input
                label={"Votre nom"}
                type="text"
                placeholder="John Doe"
                yup={register("fullname")}
                yupError={errors.fullname}
              />
            </div>
            <div className="w-full max-w-[640px]">
              <Input
                label={"Votre email"}
                type="text"
                placeholder="john.doe@gmail.com"
                yup={register("email")}
                yupError={errors.email}
              />
            </div>
          </div>
          <Input
            label={"Objet du message"}
            type="text"
            placeholder="Envoi de mots doux"
            yup={register("subject")}
            yupError={errors.subject}
          />
          <Input
            label={"Message"}
            isTextArea
            placeholder="Vous qui lisez ce message, vous êtes magnifique ! ... J’ai vu votre sourire !"
            yup={register("message")}
            yupError={errors.message}
          />
          <div className="w-full flex gap-2 items-center text-left">
            <input
              {...register("rgpd")}
              type="checkbox"
              id="contact_rgpd"
              required={true}
              className="!rounded-[5px] mt-1 relative peer appearance-none min-w-4 max-w-4 maw-h-4 min-h-4 border border-primary cursor-pointer text-bg checked:bg-secondary checked:!bg-primary before:checked:content-[2714] before:checked:absolute before:checked:right-[1px] before:checked:top-[-5px] before:checked:text-primary check"
            />
            <label htmlFor="contact_rgpd" className="pt-1">
              En continuant, vous validez avoir lu et accepté les 
              <Link className="underline text-primary" to={"/privacy"}>
                politiques de confidentialité
              </Link>
              .
            </label>
            {errors.rgpd && (
              <p className="text-red-500 text-xs">{errors.rgpd.message}</p>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <Button text="Envoyer mon message" isFull />
          </div>
        </form>
      </div>
    </div>
  );
}

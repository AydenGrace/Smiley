import React, {useContext} from "react";
import FormPage from "../components/FormPage";
import FormCard from "../components/FormCard";
import {BsQuestionCircle} from "react-icons/bs";
import Input from "../components/Input";
import {Link} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {UserContext} from "../context/UserContext";
import toast from "react-hot-toast";
import {forgottenPassword} from "../apis/auth.api";

export default function ForgottenPwd() {
  const schema = yup.object({
    email: yup.string().email("Veuillez indiquer une adresse email valide."),
  });
  const defaultValues = {
    email: "",
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
    if (await forgottenPassword(values.email)) {
      reset(defaultValues);
      toast.success(
        "Un mail a été envoyé si un compte existe avec cette adresse."
      );
    } else {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <FormPage
      image={
        "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//forgot-1.webp"
      }
    >
      <FormCard>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-2.5 w-full items-center justify-center"
        >
          <div className="w-full flex items-center justify-center text-primary">
            <BsQuestionCircle size={40} />
          </div>
          <div className="w-full flex flex-col text-center">
            <h1 className="leading-9 text-[40px]">Petit oubli ?</h1>
            <p className="opacity-75">Récupération du mot de passe</p>
          </div>
          <Input
            label={"Email"}
            type="email"
            placeholder="john.doe@gmail.com"
            yup={register("email")}
            yupError={errors.email}
          />
          <Button text="Vérifier mon compte" isFull />
        </form>
      </FormCard>
    </FormPage>
  );
}

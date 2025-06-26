import React from "react";
import FormPage from "../components/FormPage";
import FormCard from "../components/FormCard";
import {IoIosLogIn} from "react-icons/io";
import Input from "../components/Input";
import {Link} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  const schema = yup.object({
    email: yup.string().email("Veuillez indiquer une adresse email valide."),
    password: yup.string().required("Veuillez indiquer votre mot de passe."),
  });
  const defaultValues = {
    email: "",
    password: "",
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
  const submit = (values) => {
    console.log(values);

    reset(defaultValues);
  };
  return (
    <FormPage
      image={
        "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//login.webp"
      }
    >
      <FormCard>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-2.5 w-full items-center justify-center"
        >
          <div className="w-full flex items-center justify-center text-primary">
            <IoIosLogIn size={40} />
          </div>
          <div className="w-full flex flex-col text-center">
            <h1 className="leading-9 text-[40px]">Bonjour !</h1>
            <p className="opacity-75">Connexion à votre compte</p>
          </div>
          <Input
            label={"Email"}
            type="email"
            placeholder="john.doe@gmail.com"
            yup={register("email")}
            yupError={errors.email}
          />
          <div className="w-full flex flex-col items-end">
            <Input
              label={"Mot de passe"}
              type="password"
              //   hasTooltip
              placeholder="************"
              yup={register("password")}
              yupError={errors.password}
            />
            <Link to={"/forgot"} className="text-primary underline text-[14px]">
              Mot de passe oublie ?
            </Link>
          </div>
          <Button text="Se Connecter" isFull />
          <p className="text-[14px] opacity-75">
            Pas encore de compte ?{" "}
            <Link to={"/register"} className="text-primary underline">
              Inscrivez-vous !
            </Link>
          </p>
        </form>
      </FormCard>
    </FormPage>
  );
}

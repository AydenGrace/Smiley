import React, {useContext, useEffect, useState} from "react";
import FormPage from "../components/FormPage";
import FormCard from "../components/FormCard";
import {LuUserRoundPlus} from "react-icons/lu";
import Input from "../components/Input";
import {Link, useParams} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {signup} from "../apis/auth.api";
import {useJwt} from "react-jwt";

export default function VerifyEmail() {
  const {token} = useParams();
  const [email, setEmail] = useState("");
  const {decodedToken, isExpired} = useJwt(token);

  useEffect(() => {
    if (!token || !decodedToken) return;

    setEmail(decodedToken.content);
  }, [token, decodedToken]);

  const [responseMessage, setResponseMessage] = useState(null);
  const schema = yup.object({
    password: yup.string().required("Veuillez indiquer un mot de passe."),
    confirm_password: yup
      .string()
      .required("Veuillez confirmer votre mot de passe."),
  });
  const defaultValues = {
    password: "",
    confirm_password: "",
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
    const response = await signup(values);
    if (response?.token) {
      toast.success("Un email de confirmation vous a été envoyé.");
      setResponseMessage("Un email de confirmation vous a été envoyé.");
    } else {
      toast.error(response.message);
      setResponseMessage(response.message);
    }
  };
  return (
    <FormPage
      image={
        "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//register-bg.webp"
      }
    >
      <FormCard>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-2.5 w-full items-center justify-center"
        >
          <div className="w-full flex items-center justify-center text-primary">
            <LuUserRoundPlus size={40} />
          </div>
          <div className="w-full flex flex-col text-center">
            <h1 className="leading-9 text-[40px]">Bienvenue</h1>
            <p className="opacity-75">Création de votre compte</p>
          </div>
          <Input
            label={"Email"}
            type="email"
            defautlValue={email}
            placeholder="john.doe@gmail.com"
            disabled
          />
          <Input
            label={"Mot de passe"}
            type="password"
            hasTooltip
            placeholder="************"
            yup={register("password")}
            yupError={errors.password}
          />
          <Input
            label={"Confirmation du mot de passe"}
            type="password"
            placeholder="************"
            yup={register("confirm_password")}
            yupError={errors.confirm_password}
          />
          <Button text="S'inscrire" isFull />
          {responseMessage && (
            <p className="text-[14px] text-center">{responseMessage}</p>
          )}
          <p className="text-[14px] opacity-75">
            Vous avez déjà un compte ?{" "}
            <Link to={"/login"} className="text-primary underline">
              Connectez-vous !
            </Link>
          </p>
        </form>
      </FormCard>
    </FormPage>
  );
}

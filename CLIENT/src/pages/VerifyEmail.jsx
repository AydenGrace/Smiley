import React, {useContext, useEffect, useState} from "react";
import FormPage from "../components/FormPage";
import FormCard from "../components/FormCard";
import {LuUserRoundPlus} from "react-icons/lu";
import Input from "../components/Input";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {signup, signupConfirm} from "../apis/auth.api";
import {useJwt} from "react-jwt";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const {token} = useParams();
  const [email, setEmail] = useState("");
  const {decodedToken, isExpired} = useJwt(token);

  useEffect(() => {
    if (!token || !decodedToken) return;

    setEmail(decodedToken.content);
  }, [token, decodedToken]);

  const [responseMessage, setResponseMessage] = useState(null);
  const schema = yup.object({
    password: yup
      .string()
      .required("Veuillez indiquer un mot de passe.")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])",
        "Le mot de passe ne correspond pas aux normes minimales."
      ),
    confirm_password: yup
      .string()
      .required("Veuillez confirmer votre mot de passe.")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne sont pas identiques."
      ),
    rgpd: yup.bool().required("Veuillez accepter les confitions."),
  });
  const defaultValues = {
    password: "",
    confirm_password: "",
    rgpd: false,
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
    console.log(values);

    const toSend = {fullname: email, password: values.password};

    const response = await signupConfirm(toSend, token);
    if (response?.user) {
      toast.success("Enregistrement validé avec succès.");
      navigate("/login");
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
          <div className="flex w-full flex-col">
            <div className="w-full flex gap-2 items-center text-left">
              <input
                {...register("rgpd")}
                type="checkbox"
                id="register_rgpd"
                required={true}
                className="!rounded-[5px] mt-1 relative peer appearance-none min-w-4 max-w-4 maw-h-4 min-h-4 border border-primary cursor-pointer text-bg checked:bg-secondary checked:!bg-primary before:checked:content-[2714] before:checked:absolute before:checked:right-[1px] before:checked:top-[-5px] before:checked:text-primary check"
              />
              <label htmlFor="register_rgpd" className="pt-1 text-xs">
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
          </div>
          <Button text="S'inscrire" isFull />
          {responseMessage && (
            <p className="text-[14px] text-center">{responseMessage}</p>
          )}
          <p className="text-xs opacity-75">
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

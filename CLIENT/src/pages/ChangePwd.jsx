import React, {useContext} from "react";
import FormPage from "../components/FormPage";
import FormCard from "../components/FormCard";
import {BsQuestionCircle} from "react-icons/bs";
import Input from "../components/Input";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {UserContext} from "../context/UserContext";
import toast from "react-hot-toast";
import {changeForgottenPassword, forgottenPassword} from "../apis/auth.api";

export default function ChangePwd() {
  const navigate = useNavigate();
  const {token} = useParams();
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
    const response = await changeForgottenPassword(values.password, token);
    if (response?.ok) {
      reset(defaultValues);
      toast.success("Votre mot de passe a bien été modifié.");
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <FormPage
      image={
        "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//forgot-2.webp"
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
            <p className="opacity-75">Modification de mon mot de passe</p>
          </div>
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
          <Button text="Vérifier mon compte" isFull />
        </form>
      </FormCard>
    </FormPage>
  );
}

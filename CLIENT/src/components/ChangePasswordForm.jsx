import React, {useContext, useState} from "react";
import Input from "./Input";
import {UserContext} from "../context/UserContext";
import Button from "./Button";
import {CiEdit} from "react-icons/ci";
import {ImCancelCircle} from "react-icons/im";
import {FaCheck} from "react-icons/fa6";
import {changeMyPwd, modifyEmail} from "../apis/user.api";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ChangePasswordForm() {
  const {user} = useContext(UserContext);
  const schema = yup.object({
    current_password: yup
      .string()
      .required("Veuillez indiquer votre mot de passe."),
    new_password: yup
      .string()
      .required("Veuillez indiquer un mot de passe.")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])",
        "Le mot de passe ne correspond pas aux normes minimales."
      ),
    confirm_password: yup
      .string()
      .required("Veuillez confirmer le nouveau mot de passe.")
      .oneOf(
        [yup.ref("new_password"), ""],
        "Les mots de passe ne sont pas identiques."
      ),
  });
  const defaultValues = {
    current_password: "",
    new_password: "",
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
    console.log(values);
    const toSend = {
      oldPwd: values.current_password,
      newPwd: values.new_password,
    };
    const response = await changeMyPwd(user._id, toSend);
    if (response?.ok) {
      toast.success("Mot de passe modifié avec succès.");
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col gap-">
      <div className="w-[300px] flex flex-col gap-2">
        <Input
          yup={register("current_password")}
          yupError={errors.current_password}
          label={"Mot de passe actuel"}
          placeholder={"Votre mot de passe actuel"}
          type="password"
        />
        <Input
          yup={register("new_password")}
          yupError={errors.new_password}
          label={"Nouveau mot de passe"}
          placeholder={"Nouveau mot de passe"}
          type="password"
          hasTooltip
        />
        <Input
          yup={register("confirm_password")}
          yupError={errors.confirm_password}
          label={"Confirmation du mot de passe"}
          placeholder={"Confirmation du mot de passe"}
          type="password"
        />
        <div className="w-full flex items-center justify-center">
          <Button text="Valider les modifications" colored />
        </div>
      </div>
    </form>
  );
}

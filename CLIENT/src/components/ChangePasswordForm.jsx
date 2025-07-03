import React, {useContext, useState} from "react";
import Input from "./Input";
import {UserContext} from "../context/UserContext";
import Button from "./Button";
import {CiEdit} from "react-icons/ci";
import {ImCancelCircle} from "react-icons/im";
import {FaCheck} from "react-icons/fa6";
import {modifyEmail} from "../apis/user.api";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ChangePasswordForm() {
  const schema = yup.object({
    current_password: yup
      .string()
      .required("Veuillez indiquer votre mot de passe."),
    new_password: yup.string().required("Veuillez le nouveau mot de passe."),
    confirm_password: yup
      .string()
      .required("Veuillez confirmer votre mot de passe."),
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

  const submit = async () => {};

  return (
    <div className="w-full flex flex-col gap-">
      <div className="w-[300px] flex flex-col gap-2">
        <Input
          label={"Mot de passe actuel"}
          placeholder={"Votre mot de passe actuel"}
          type="password"
        />
        <Input
          label={"Nouveau mot de passe"}
          placeholder={"Nouveau mot de passe"}
          type="password"
          hasTooltip
        />
        <Input
          label={"Confirmation du mot de passe"}
          placeholder={"Confirmation du mot de passe"}
          type="password"
        />
      </div>
    </div>
  );
}

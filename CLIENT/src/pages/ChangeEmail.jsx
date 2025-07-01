import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Title from "../components/Title";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import {useEffect} from "react";
import {confirmModifyEmail} from "../apis/user.api";
import toast from "react-hot-toast";

export default function ChangeEmail() {
  const {token} = useParams();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  useEffect(() => {
    const sendToken = async () => {
      const response = await confirmModifyEmail(token);
      console.log(response);

      if (response?.user) {
        toast.success("Email modifié avec succès !");
        if (user) navigate("/logout");
        else navigate("/");
      } else {
        toast.error(response.message);
        navigate("/");
      }
    };
    sendToken();
  }, []);

  return (
    <div className="w-full min-h-screen pt-[70px] flex items-center justify-center">
      <Title>
        <span className="text-primary font-medium">Demande</span> en cours de
        traitement.
      </Title>
    </div>
  );
}

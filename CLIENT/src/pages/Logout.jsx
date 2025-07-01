import React, {useContext, useEffect} from "react";
import Title from "../components/Title";
import {UserContext} from "../context/UserContext";

export default function Logout() {
  const {logout} = useContext(UserContext);

  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="w-full min-h-screen pt-[70px] flex items-center justify-center">
      <Title>
        <span className="text-primary font-medium">Déconnexion</span> en cours.
      </Title>
    </div>
  );
}

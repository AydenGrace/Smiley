import TitleThree from "../components/TitleThree";
import Button from "../components/Button";
import {IoIosLogOut} from "react-icons/io";
import {Link, useSearchParams} from "react-router-dom";
import ChangeEmailForm from "../components/ChangeEmailForm";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";

export default function AccountSettings() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  return (
    <div className="min-h-[154px] w-full p-4 flex flex-col gap-4">
      <TitleThree>
        Informations de{" "}
        <span className="text-primary font-medium tracking-[-0.6px]">
          Connexion
        </span>
      </TitleThree>
      {/* PARAMETERS */}
      <section className="w-full flex gap-4">
        <div className="flex w-full flex-col">
          <ChangeEmailForm />
        </div>
        <div className="flex w-full flex-col"></div>
      </section>
      <section className="w-full flex justify-between">
        <Button
          defaultColor="#dc2626"
          icon={<IoIosLogOut size={24} />}
          text="Supprimer mon compte"
          colored
        />
        <Link to={"/logout"}>
          <Button
            defaultColor="#dc2626"
            icon={<IoIosLogOut size={24} />}
            text="Déconnexion"
            colored
            isFull
            onClick={() => setModalOpen(true)}
          />
        </Link>
      </section>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)} />
    </div>
  );
}

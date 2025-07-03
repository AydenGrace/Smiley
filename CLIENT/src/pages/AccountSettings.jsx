import TitleThree from "../components/TitleThree";
import Button from "../components/Button";
import {IoIosLogOut} from "react-icons/io";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import ChangeEmailForm from "../components/ChangeEmailForm";
import {useContext, useEffect, useState} from "react";
import Modal from "../components/Modal";
import {UserContext} from "../context/UserContext";
import {deleteMyAccount} from "../apis/user.api";
import toast from "react-hot-toast";

export default function AccountSettings() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  const deleteAccount = async () => {
    const response = await deleteMyAccount(user._id);
    if (response?.user) {
      console.log(response.user);
      toast.success("Compte supprimé avec succès");
      navigate("/logout");
    } else {
      console.log(response.message);
      toast.error("Une erreur est survenue.");
    }
  };

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
          onClick={() => setModalOpen(true)}
        />
        <Link to={"/logout"}>
          <Button
            defaultColor="#dc2626"
            icon={<IoIosLogOut size={24} />}
            text="Déconnexion"
            colored
            isFull
          />
        </Link>
      </section>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)}>
        <div className="w-full flex flex-col max-w-[500px] text-center">
          <p className="font-bold text-red text-lg">
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </p>
          <p>Cette action est irréversible.</p>
          <div className="w-full justify-between flex mt-4">
            <Button
              defaultColor="#dc2626"
              text="Supprimer mon compte"
              colored
              isFull
              onClick={deleteAccount}
            />
            <Button
              defaultColor="#dc2626"
              text="Annuler"
              colored
              onClick={() => setModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

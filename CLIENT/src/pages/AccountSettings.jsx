import TitleThree from "../components/TitleThree";
import Button from "../components/Button";
import {IoIosLogOut} from "react-icons/io";
import {Link} from "react-router-dom";
import ChangeEmailForm from "../components/ChangeEmailForm";

export default function AccountSettings() {
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
      <section className="w-full flex">
        <Link to={"/logout"}>
          <Button
            defaultColor="#dc2626"
            icon={<IoIosLogOut size={24} />}
            text="Déconnexion"
            colored
          />
        </Link>
      </section>
    </div>
  );
}

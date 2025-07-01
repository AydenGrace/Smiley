import React, {useContext, useState} from "react";
import Input from "./Input";
import {UserContext} from "../context/UserContext";
import Button from "./Button";
import {CiEdit} from "react-icons/ci";
import {ImCancelCircle} from "react-icons/im";
import {FaCheck} from "react-icons/fa6";
import {modifyEmail} from "../apis/user.api";
import {toast} from "react-hot-toast";

export default function ChangeEmailForm() {
  const {user, setUser} = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const setEdit = () => {
    setIsEditing(true);
    setValue(user.email);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setValue("");
  };

  const submit = async () => {
    console.log(value);
    const response = await modifyEmail(user._id, value);
    console.log(response);
    if (response?.user) {
      toast.success(
        "Votre demande a été prise en compte. Vérifiez vos emails."
      );
      setUser(response.user);
      setValue("");
      setIsEditing(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex gap-4 items-end">
        <div className="w-[300px]">
          <Input
            label={"Email"}
            placeholder={user.email ? user.email : "john.doe@gmail.com"}
            type="email"
            disabled={!isEditing}
            defautlValue={value}
            getValueOnChange={(val) => setValue(val)}
          />
        </div>
        {isEditing ? (
          <div className="flex mb-[2px] gap-2">
            <Button
              text={null}
              isSquare
              colored
              icon={<FaCheck size={24} />}
              onClick={submit}
            />
            <Button
              text={null}
              isSquare
              icon={<ImCancelCircle size={24} />}
              defaultColor="#dc2626"
              colored
              onClick={cancelEdit}
            />
          </div>
        ) : (
          <div className="flex mb-[3px]">
            <Button
              isSquare
              icon={<CiEdit size={24} />}
              text={null}
              onClick={setEdit}
            />
          </div>
        )}
      </div>
      {user.isEmailMod && (
        <p className="text-primary text-xs font-semibold">
          Demande de modification d'email en cours.
        </p>
      )}
    </div>
  );
}

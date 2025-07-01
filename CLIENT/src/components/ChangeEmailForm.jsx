import React, {useContext, useState} from "react";
import Input from "./Input";
import {UserContext} from "../context/UserContext";
import Button from "./Button";
import {CiEdit} from "react-icons/ci";

export default function ChangeEmailForm() {
  const {user} = useContext(UserContext);
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

  const submit = () => {
    setIsEditing(false);
    setValue("");
    // Faire le chemin
  };

  return (
    <div className="w-full flex gap-4 items-end">
      <Input
        label={"Email"}
        placeholder={user.email ? user.email : "john.doe@gmail.com"}
        type="email"
        disabled={!isEditing}
        defautlValue={value}
      />
      {isEditing ? (
        <div className="flex mb-[2px] gap-2">
          <Button text={"Valider"} isFull onClick={submit} />
          <Button
            text={"Annuler"}
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
  );
}

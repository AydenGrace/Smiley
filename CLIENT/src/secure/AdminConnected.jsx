import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";
export default function AdminConnected({children}) {
  const {user} = useContext(UserContext);
  return user.role._id === import.meta.env.VITE_ADMIN_UUID ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

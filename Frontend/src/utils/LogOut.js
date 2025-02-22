import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import usersApi from "../redux/users/users";

const useLogout = (role) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");


    dispatch(usersApi.util.resetApiState());


    navigate( role + "/login");

  };

  return logout;
};

export default useLogout;

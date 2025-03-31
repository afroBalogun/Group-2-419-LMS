import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import usersApi from "../redux/users/users";

const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return () => {
        console.log("Logging out...");

        // ✅ Clear user session data
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        // ✅ Reset Redux API state
        dispatch(usersApi.util.resetApiState());

        console.log("Redirecting to login...");
        navigate("/"); // ✅ Redirect user to login
    };
};

export default useLogout;

import { jwtDecode } from "jwt-decode";

const getUserId = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID is not available in localStorage.");
        return null;  // Return null if no userId is found
    }

    return userId;  // Return the stored userId
};

export default getUserId;

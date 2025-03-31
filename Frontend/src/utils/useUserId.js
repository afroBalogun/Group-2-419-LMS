import { useState, useEffect } from "react";

const useUserId = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    useEffect(() => {
        const handleStorageChange = () => {
            setUserId(localStorage.getItem("userId") || null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return userId;
};

export default useUserId;

// import { useLocation } from "react-router";
// import useLogout from "./LogOut";
// import { useEffect } from "react";

// export default function AutoLogout() {
//     const logout = useLogout();
//     const location = useLocation();

//     // Define base dashboard paths
//     const isInDashboard = location.pathname.includes("/dashboard");


//     useEffect(() => {
//         console.log("Current Path:", location.pathname);
//         console.log("Is in Dashboard:", isInDashboard);

//         if (!isInDashboard) {
//             console.log("User leaving dashboard. Logging out...");
//             logout(); }
//     }, [location.pathname]);

//     return null; // No UI component needed
// }

const getBaseUrl = () => {
    return process.env.NODE_ENV === "production"
    ? "https://group-2-419-lms.onrender.com"
    : "http://localhost:5000";
};

 
 export default getBaseUrl

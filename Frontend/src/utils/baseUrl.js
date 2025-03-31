const getBaseUrl = () => {
    return process.env.NODE_ENV === "production"
    ? "https://citadel-missionary-form.onrender.com"
    : "http://localhost:5000";
};

 
 export default getBaseUrl

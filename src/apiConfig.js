let apiUrl;
const apiUrls = {
  production: "https://play-ground-api.onrender.com",
  development: "http://localhost:4741",
};

if (process.env.NODE_ENV === "production") {
  apiUrl = apiUrls.production;
} else {
  apiUrl = apiUrls.development;
}

export default apiUrl;

import axios from "axios";

const DEVELOPMENT_URL = "http://localhost:5000";
const PRODUCTION_URL = "";

export default axios.create({
  baseURL:
    process.env["NODE_ENV"] === "development" ? `${DEVELOPMENT_URL}/api` : `${PRODUCTION_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/grocery_store",
    headers: {
        "Content-type" : "application/json"
    }
});
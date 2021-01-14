import axios from "axios";

export default axios.create({
    baseURL: "https://hopsfyi.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});
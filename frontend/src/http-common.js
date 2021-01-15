import axios from "axios";

export default axios.create({
    baseURL: "http://hopsfyi.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});
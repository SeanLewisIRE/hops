
import axios from "axios";

export default axios.create({
    baseURL: "https://hopsfyi.herokuapp.com/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

// http://localhost:8080/api
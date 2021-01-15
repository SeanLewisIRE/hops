import axios from "axios";

export default axios.create({
    baseURL: "https://hopsfyi.herokuapp.com",
    headers: {
        "Content-type": "application/json",
        "Access- Control - Allow - Origin": "https://hopsfyi.herokuapp.com/api"
    }
});
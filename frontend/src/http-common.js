import axios from "axios";

export default axios.create({
    baseURL: "https://hopsfyi.herokuapp.com/api/beers",
    headers: {
        "Content-type": "application/json"
    }
});
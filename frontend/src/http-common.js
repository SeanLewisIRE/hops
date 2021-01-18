
import axios from "axios";
require('dotenv').config()

function axiosCreate() {
    if (process.env.REACT_APP_DEPLOY === 'true') {
        console.log("live")
        return axios.create({
            baseURL: "https://hopsfyi.herokuapp.com/api",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } else {
        console.log("local")
        return axios.create({
            baseURL: "http://localhost:8080/api",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}

export default axiosCreate()

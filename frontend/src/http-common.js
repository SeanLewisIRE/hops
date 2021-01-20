
import axios from "axios";
require('dotenv').config()

function axiosCreate() {
    console.log("This is AXIOS testing")
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
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

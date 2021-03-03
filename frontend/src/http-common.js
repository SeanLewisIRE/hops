
import axios from "axios";
require('dotenv').config()

// function AxiosCreate(token) {

//     if (process.env.NODE_ENV === 'production') {
//         return axios.create({
//             baseURL: "https://hopsfyi.herokuapp.com/api",
//             headers: {
//                 "Content-type": "application/json",
//                 "Access-Control-Allow-Origin": "*"
//             }
//         });
//     } else if (process.env.NODE_ENV === 'development') {
//         return axios.create({
//             baseURL: "http://localhost:8080/api",
//             headers: {
//                 "Content-type": "application/json",
//                 "Access-Control-Allow-Origin": "*",
//                 // "Accept": "application/json",
//                 // "Authorization": `Bearer ${token}`
//             }
//         });
//     }
// }

// export default AxiosCreate

export default axios.create({
            baseURL: "http://localhost:8080/api",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                // "Accept": "application/json",
                // "Authorization": `Bearer ${token}`
            }
        });
import http from "../http-common";

class hopsDataService {

    getAll() {
        return http.get("/beers")
    }

    create(data) {
        return http.post("/beers", data)
    }
    
}

export default new hopsDataService()
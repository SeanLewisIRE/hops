import http from "../http-common";

class hopsDataService {

    getAll() {
        return http.get("/beers")
    }

    get(id) {
        return http.get(`/beers/${id}`);
    }

    create(data) {
        return http.post("/beers", data)
    }
    
}

export default new hopsDataService()
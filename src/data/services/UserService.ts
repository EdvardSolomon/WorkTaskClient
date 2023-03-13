import $api from "../http";

// add models and types
export default class UserService {
    static getCurrentUser() {
        return $api.get('/users/me');
    }
}
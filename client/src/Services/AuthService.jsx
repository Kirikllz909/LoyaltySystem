import axios from "axios";

const API_URL = "http://localhost:3030/api/authService";

class AuthService {
    /**
     * Return response with provided params. At the same time write to local storage user data
     * @param {*} login user login
     * @param {*} password user password
     * @returns response.data
     */
    login(login, password) {
        return axios
            .post(API_URL + "/login", {
                login: login,
                password: password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    /**
     * Delete access token from localStorage
     */
    logOut() {
        localStorage.removeItem("user");
    }

    /**
     * Make request to register user with provided params
     * @param {*} login User login
     * @param {*} email User email
     * @param {*} password User password
     * @param {*} repeatPassword User password in repeat password input
     */
    register(login, email, password, repeatPassword) {
        axios.post(API_URL + "/register", {
            login: login,
            email: email,
            password: password,
            repeatPassword: repeatPassword,
        });
    }
    /**
     * Get information about user from localStorage
     * @returns Parsed information in localStorage
     */
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();

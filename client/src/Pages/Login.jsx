import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        login: "",
        password: "",
    };

    //TODO:  Make request with AuthService

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="container col-3 align-self-center border-2  border p-4 mt-5">
                <form
                    className="row"
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <p>Login</p>
                    <input
                        type="text"
                        value={this.state.login}
                        onChange={(e) => this.handleLoginChange(e)}
                    />
                    <p p className="mt-3">
                        Password
                    </p>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.handlePasswordChange(e)}
                    />
                    <button type="submit" class="btn btn-primary mt-3">
                        Авторизация
                    </button>
                    <Link to="/register" className="btn btn-primary mt-3">
                        Регистрация
                    </Link>
                </form>
            </div>
        );
    }
}

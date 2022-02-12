import React from "react";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange =
            this.handleRepeatPasswordChange.bind(this);
    }

    state = {
        login: "",
        password: "",
        repeatPassword: "",
        email: "",
    };

    //TODO: Make request with AuthService

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleRepeatPasswordChange(event) {
        this.setState({ repeatPassword: event.target.value });
    }
    handleSubmit() {}

    render() {
        return (
            <div className="container col-3 align-self-center border-2  border p-4 mt-5">
                <form className="row" onSubmit={this.handleSubmit}>
                    <p>Login</p>
                    <input
                        type="text"
                        value={this.state.login}
                        onChange={(event) => this.handleLoginChange(event)}
                    />
                    <p className="mt-3">Email</p>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={(event) => this.handleEmailChange(event)}
                    />
                    <p className="mt-3">Password</p>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.handlePasswordChange(event)}
                    />
                    <p className="mt-3"> Repeat password</p>
                    <input
                        type="password"
                        value={this.state.repeatPassword}
                        onChange={(event) =>
                            this.handleRepeatPasswordChange(event)
                        }
                    />
                    <button className="btn btn-primary mt-3" type="submit">
                        Регистрация
                    </button>
                </form>
            </div>
        );
    }
}

import React from "react";
import { AdminNavigation } from "../Elements/AdminNavigation";
import { Header } from "../Elements/Header";

export default class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <AdminNavigation />
            </div>
        );
    }
}

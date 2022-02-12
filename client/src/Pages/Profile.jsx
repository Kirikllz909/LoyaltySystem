import React from "react";
import { AdminNavigation } from "../Elements/AdminNavigation";
import { Header } from "../Elements/Header";
import { Footer } from "../Elements/Footer";

export default class Profile extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <AdminNavigation />
                <Footer />
            </div>
        );
    }
}

import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { UserPanel } from "./UserPanel";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-light bg-light  sticky-top">
            <div className="container-fluid">
                <Link to="/" className="float-start">
                    <FaHome className="link-dark" />
                    Home
                </Link>
                <div className="float-end col-1">
                    <UserPanel role={props.role} name={props.name} />
                </div>
            </div>
        </nav>
    );
};

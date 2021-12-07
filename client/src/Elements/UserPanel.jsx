import { FaUserAltSlash, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserPanel = (props) => {
    const [name, setName] = useState("Guest");
    const [role, setRole] = useState("guest");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.name) {
            setName(props.name);
        }
        if (props.role) {
            setRole(props.role);
        }
    }, [props]);

    return (
        <div className="text-center">
            <div
                className=" border-dark border-2 border p-2"
                onClick={() => setVisible(!visible)}
            >
                {name === "Guest" ? <FaUserAltSlash /> : <FaUserAlt />}
            </div>
            {role === "guest" && visible && (
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/login">Авторизация</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/register">Регистрация</Link>
                    </li>
                </ul>
            )}
            {(role === "user" || role === "admin") && visible && (
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/changePassword">Смена пароля</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/help">Помощь</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/logOut">Выход из аккаунта</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

import { Link } from "react-router-dom";

export const AdminNavigation = () => {
    return (
        <div className="col-2 vh-100">
            <ul className="list-group text-center">
                <li className="list-group-item">
                    <Link to="/Users">Пользователи</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/UsersPersonalData">
                        Персональная информация пользователей
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/History">История покупок пользователей</Link>
                </li>
                <li className="list-group-item">
                    {" "}
                    <Link to="/Systems">Системы лояльности</Link>
                </li>
            </ul>
        </div>
    );
};

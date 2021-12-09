import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Profile from "./Pages/Profile.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

//TODO: Create routes for homepage, systemspage, historypage,personaldatapage
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Profile />} path="/profile" />
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

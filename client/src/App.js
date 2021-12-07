import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./Pages/Profile.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Profile />} path="/Profile" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

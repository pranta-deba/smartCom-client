import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
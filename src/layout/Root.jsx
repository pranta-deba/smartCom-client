import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

const Root = () => {
    return (
        <div className="bg-[#F1F5F9]">
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
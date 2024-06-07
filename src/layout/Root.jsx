import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;
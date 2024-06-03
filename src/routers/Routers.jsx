import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import JoinHR from "../pages/JoinHR/JoinHR";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import Assets from "../pages/HR/Assets";
import Employee from "../pages/HR/Employee";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/join_hr/:amount",
                element: <JoinHR />
            },
            {
                path: "/join_employer",
                element: <JoinEmployee />
            },
            {
                path: "/assets",
                element: <Assets />
            },
            {
                path: "/employee",
                element: <Employee />
            },
        ]
    },
]);
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import JoinHR from "../pages/JoinHR/JoinHR";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import Assets from "../pages/HR/Assets";
import Employee from "../pages/HR/Employee";
import Private from "./Private";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import RequestForAnAssets from "../pages/Employee/RequestForAnAssets";
import MyAssetsRequest from "../pages/Employee/MyAssetsRequest";

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
                element: <Private><HrRoute><Assets /></HrRoute></Private>
            },
            {
                path: "/employee",
                element: <Private><HrRoute><Employee /></HrRoute></Private>
            },
            {
                path: "/request_for_an_assets",
                element: <Private><EmployeeRoute><RequestForAnAssets /></EmployeeRoute></Private>
            },
            {
                path: "/my_assets_request",
                element: <Private><EmployeeRoute><MyAssetsRequest /></EmployeeRoute></Private>
            },
        ]
    },
]);
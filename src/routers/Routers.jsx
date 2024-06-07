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
import MyTeam from "../pages/Employee/MyTeam";
import AddAssets from "../pages/HR/AddAssets";
import EmployeeRequest from "../pages/HR/EmployeeRequest";
import PendingRequest from "../pages/HR/PendingRequest";
import Profile from "../pages/Profile/Profile";

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
                path: "/profile",
                element: <Private><Profile/></Private>
            },
            {
                path: "/assets",
                element: <Private><HrRoute><Assets /></HrRoute></Private>
            },
            {
                path: "/add_assets",
                element: <Private><HrRoute><AddAssets /></HrRoute></Private>
            },
            {
                path: "/pending_requests",
                element: <Private><HrRoute><PendingRequest /></HrRoute></Private>
            },
            {
                path: "/employee",
                element: <Private><HrRoute><Employee /></HrRoute></Private>
            },
            {
                path: "/employee_requests",
                element: <Private><HrRoute><EmployeeRequest /></HrRoute></Private>
            },
            {
                path: "/request_for_an_assets",
                element: <Private><EmployeeRoute><RequestForAnAssets /></EmployeeRoute></Private>
            },
            {
                path: "/my_assets_request",
                element: <Private><EmployeeRoute><MyAssetsRequest /></EmployeeRoute></Private>
            },
            {
                path: "/my_team",
                element: <Private><EmployeeRoute><MyTeam /></EmployeeRoute></Private>
            },
        ]
    },
]);
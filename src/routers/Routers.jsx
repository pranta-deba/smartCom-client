import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import JoinHR from "../pages/JoinHR/JoinHR";

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
                path: "/join_hr",
                element: <JoinHR/>
            },
            // {
            //     path: "/contact",
            //     element: <Contact/>
            // },
            // {
            //     path: "/login",
            //     element: <Login/>
            // },
            // {
            //     path: "/register",
            //     element: <Register/>
            // },
            // {
            //     path: "/profile",
            //     element: <Profile/>
            // }
        ]
    },
]);
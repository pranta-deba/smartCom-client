import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Spinner/Loader";
import useGetRole from "../hooks/useGetRole";
import PropTypes from 'prop-types';


const EmployeeRoute = ({ children }) => {
    const [isRole, isRoleLoading] = useGetRole();
    const { user, userLoader } = useAuth();

    if (userLoader || isRoleLoading) {
        return <div className="min-h-[calc(100vh-68.500px)] flex justify-center items-center">
            <Loader color="primaryColor" />
        </div>
    }
    if (user && isRole === "EMPLOYEE") {
        return children;
    }
    return <Navigate to={"/"}></Navigate>
};

EmployeeRoute.propTypes = {
    children: PropTypes.node,
}

export default EmployeeRoute;
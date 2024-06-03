import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Spinner/Loader";

import PropTypes from 'prop-types';

const Private = ({ children }) => {
    const { user, userLoader } = useAuth();
    if (userLoader) {
        return <div className="min-h-[calc(100vh-68.500px)] flex justify-center items-center">
            <Loader color="primaryColor" />
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to={"/"}></Navigate>
};

Private.propTypes = {
    children: PropTypes.element,
};

export default Private;
import { ImSpinner3 } from "react-icons/im";
import PropTypes from 'prop-types';

const Loader = ({ size = 30, color = 'White' }) => {
    return (
        <div>
            <ImSpinner3 className={`animate-spin text-${color}`} size={size} />
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
};
export default Loader;
import { RiAdminLine } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import PropTypes from 'prop-types';
const TeamCard = ({ item }) => {
    return (
        <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 rounded-xl">
            <div className="space-y-4">
                <div className="space-y-2">
                    {item?.profile ? <img src={item?.profile} alt="" className="block object-cover object-center w-full rounded-md h-52 dark:bg-gray-500" /> : <img src="https://i.ibb.co/bb493GZ/blank-user.jpg" className="block object-cover object-center w-full rounded-md h-52 dark:bg-gray-500" />}
                    <div className="flex gap-2 items-center text-xs">
                        <span>{item?.role === "HR" ? <RiAdminLine size={20} /> : <FaUserCheck size={20} />} </span>
                        <span>{item?.role}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <a className="block">
                        <h3 className="text-xl font-semibold dark:text-violet-600 text-center">{item?.full_name}</h3>
                    </a>
                </div>
            </div>
        </div>
    );
};

TeamCard.propTypes = {
    item: PropTypes.object.isRequired
}

export default TeamCard;
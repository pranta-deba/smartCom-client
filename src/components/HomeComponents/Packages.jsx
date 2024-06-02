import { Button } from "@mui/material";
import useAboutData from "../../hooks/useAboutData";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const Packages = () => {
    const { packages } = useAboutData();

    return (
        <div className="my-20 max-w-[1500px] w-[90%] mx-auto">
            <h1 className="text-5xl text-center font-bold text-primaryColor">Our Easy Pricing Plans <br /> For Everyone.</h1>
            <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap items-stretch -mx-4">
                        {
                            packages.map(item => (
                                <div key={item?.type} className={`flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 rounded-2xl ${item?.type === 'Pro' ? "bg-primaryColor text-White" : ""}`}>
                                    <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                                        <div className="space-y-2">
                                            <h4 className={`text-xl font-bold ${item?.type === 'Pro' ? "!text-White" : "text-primaryColor"}`}>{item?.type}</h4>
                                            <span className={`text-6xl font-bold ${item?.type === 'Pro' ? "!text-White" : "text-primaryColor"}`}>${item?.amount}</span>
                                        </div>
                                        <ul className="flex-1 mb-6 dark:text-gray-600">
                                            <li className="flex items-center mb-2 space-x-2 raleway">
                                                <IoCheckmarkDoneCircle size={25} />
                                                <span>{item?.employees} Employees</span>
                                            </li>
                                            <li className="flex items-center mb-2 space-x-2">
                                                <IoCheckmarkDoneCircle size={25} />
                                                <span>{item?.limitation}</span>
                                            </li>
                                            <li className="flex items-center mb-2 space-x-2">
                                                <IoCheckmarkDoneCircle size={25} />
                                                <span>{item?.db}</span>
                                            </li>
                                            <li className="flex items-center mb-2 space-x-2">
                                                <IoCheckmarkDoneCircle size={25} />
                                                <span>{item?.expired}</span>
                                            </li>
                                        </ul>
                                        <Button variant="contained" disableElevation className={`!py-3 ${item?.type === 'Pro' ? "!bg-White !text-Black" : "!bg-primaryColor !text-White"}`}>
                                           <Link to={`/join_hr/${item?.amount}`}>Get Started</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Packages;
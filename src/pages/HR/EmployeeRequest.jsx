import axios from "axios";
import useGetEmployeeRequest from "../../hooks/useGetEmployeeRequest";
import toast from "react-hot-toast";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import useGetUser from "../../hooks/useGetUser";
import { HiMiniUsers } from "react-icons/hi2";
import { SiFampay } from "react-icons/si";
import { BsClock } from "react-icons/bs";
import useGetAllEmployee from "../../hooks/useGetAllEmployee";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EmployeeRequest = () => {
    const [employee_requests, refetch] = useGetEmployeeRequest();
    const [isUser] = useGetUser();
    const [employees] = useGetAllEmployee()
    const [oldDate, setOldDate] = useState(null);
    const [counter, setCounter] = useState('');


    useEffect(() => {
        const getOldDate = async () => {
            setOldDate(new Date(isUser?.purchase_date));
        };
        getOldDate();
    }, [isUser?.purchase_date]);

    useEffect(() => {
        if (!oldDate) return;
        const updateCounter = () => {
            const days = differenceInDays(isUser?.expiration_date, oldDate);
            setCounter(`${days} days`);
        };
        updateCounter();
    }, [isUser?.expiration_date, oldDate]);

    const handleRequestChanges = async (e, id) => {
        const { data } = await axios.put(`${import.meta.env.VITE_Base_URL}/users/verified_employee/${id}?company=${isUser?.company_name}`);
        if (data.modifiedCount > 0) {
            toast.success("Employee Added Successfully")
            refetch()
        }
    }

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            <Helmet>
                <title>Add Employee</title>
            </Helmet>
            <div>
                <CompanyHeader />
            </div>
            <div className="p-4 max-w-[1450px] mx-auto">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-6">
                    <div className="shadow-xl border border-primaryColor p-6 w-full md:flex-1 rounded-xl flex gap-3 items-center">
                        <p><HiMiniUsers size={30} /></p>
                        <div>
                            <h1 className="lg:text-2xl font-bold">Employee : {employees.length}
                            <span className="text-xs"> / Limit : {isUser.members}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="shadow-xl border border-primaryColor p-6 w-full md:flex-1 rounded-xl flex gap-3 items-center">
                        <p><BsClock size={30} className="animate-spin" /></p>
                        <h1 className="lg:text-2xl font-bold">Package Expiry: {counter}</h1>
                    </div>
                    <div className="shadow-xl border border-primaryColor p-6 w-full md:flex-1 rounded-xl flex gap-3 items-center">
                        <p><SiFampay size={30} /></p>
                        <h1 className="lg:text-2xl font-bold">Total Pay : ${isUser.packages_rate}</h1>
                    </div>
                </div>
                <div className="flex justify-center my-12">

                    <Button className="!bg-primaryColor !text-White">
                        <Link to={"/join_hr/15"}>Buy More Employee</Link>
                    </Button>

                </div>
                <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)] my-10">
                    <div className="mb-4">
                        <h1 className="md:text-5xl text-primaryColor font-bold text-center my-4 md:my-8">Employee Request</h1>
                    </div>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full text-xs">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col className="w-24" />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="bg-gray-700 dark:bg-gray-300">
                                <tr className="text-left">
                                    <th className="p-3">No.</th>
                                    <th className="p-3">Full Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Date Of Birth</th>
                                    <th className="p-3">role</th>
                                    <th className="p-3">verified</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employee_requests.map((item, idx) => (
                                        <tr key={item?._id} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{idx + 1}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{item?.full_name}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{item?.email}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{item?.date_of_birth || "empty"}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{item?.role}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{item?.verified ? "Verified" : "Not Verified"}</p>
                                            </td>
                                            <td className="p-3">
                                                <input onChange={(e) => handleRequestChanges(e, item._id)} defaultChecked={item?.verified} type="checkbox" className="toggle theme-controller" />
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeRequest;
import { Badge, Button } from "@mui/material";
import { useState } from "react";
import useGetEmployeeRequest from "../../hooks/useGetEmployeeRequest";
import axios from "axios";
import toast from "react-hot-toast";
import useGetAllEmployee from "../../hooks/useGetAllEmployee";
const Employee = () => {
    const [selected, setSelected] = useState('My Employee List');
    const [employee_requests, , refetch] = useGetEmployeeRequest();
    const [employees] = useGetAllEmployee();


    const handleRequestChanges = async (e, id) => {
        const { data } = await axios.put(`${import.meta.env.VITE_Base_URL}/users/verified_employee/${id}`)
        if (data.modifiedCount > 0) {
            toast.success("Employee Added Successfully")
            refetch()
        }
    }

    return (
        <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)]">
            <h1 className="text-4xl text-center font-bold my-3">Management</h1>
            <div className="flex flex-col md:flex-row gap-2 relative">
                <div className="min-w-56 p-3 space-y-3 flex flex-col md:min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg sticky top-0 md:h-screen">
                    <Badge badgeContent={employees.length} color="primary">
                        <Button onClick={() => setSelected('My Employee List')} className={selected === 'My Employee List' ? "!bg-secondaryColor !text-Black !w-full" : "!bg-primaryColor !text-White !w-full"}>
                            My Employee List
                        </Button>
                    </Badge>
                    <Badge badgeContent={0} color="primary">
                        <Button onClick={() => setSelected('Add an Employee')} className={selected === 'Add an Employee' ? "!bg-secondaryColor !text-Black !w-full" : "!bg-primaryColor !text-White !w-full"}>
                            Add an Employee
                        </Button>
                    </Badge>
                    <Badge badgeContent={employee_requests.length} color="primary">
                        <Button onClick={() => setSelected('Employee Requests')} className={selected === 'Employee Requests' ? "!bg-secondaryColor !text-Black !w-full" : "!bg-primaryColor !text-White !w-full"}>
                            Employee Requests
                        </Button>
                    </Badge>
                </div>

                <div className="flex-1 md:h-full md:min-w-56 p-3 space-y-3 flex flex-col md:min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                    {selected === 'My Employee List' &&
                        <div>
                            <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
                                <h2 className="mb-4 text-2xl font-semibold leading-tight">All Employees</h2>
                                <div className="overflow-x-auto">
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
                                                employees.map((item, idx) => (
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
                                                            <p>{item?.date_of_birth ? new Date(item?.date_of_birth).toLocaleDateString() : "Empty"}</p>
                                                        </td>
                                                        <td className="p-3">
                                                            <p>{item?.role}</p>
                                                        </td>
                                                        <td className="p-3">
                                                            <p>{item?.verified ? "Verified" : "Not Verified"}</p>
                                                        </td>
                                                        <td className="p-3">

                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                    {selected === 'Add Asset' &&
                        <div>
                            add assets
                        </div>
                    }
                    {selected === 'All Requests' &&
                        <div>
                            all request
                        </div>
                    }
                    {selected === 'Requests List' &&
                        <div>
                            Requests List
                        </div>
                    }
                    {selected === 'Employee Requests' &&
                        <div>
                            <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
                                <h2 className="mb-4 text-2xl font-semibold leading-tight">Employee Request</h2>
                                <div className="overflow-x-auto">
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
                    }
                </div>
            </div>
        </div>
    );
};

export default Employee;
import axios from "axios";
import useGetEmployeeRequest from "../../hooks/useGetEmployeeRequest";
import toast from "react-hot-toast";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";

const EmployeeRequest = () => {
    const [employee_requests, , refetch] = useGetEmployeeRequest();

    const handleRequestChanges = async (e, id) => {
        const { data } = await axios.put(`${import.meta.env.VITE_Base_URL}/users/verified_employee/${id}`)
        if (data.modifiedCount > 0) {
            toast.success("Employee Added Successfully")
            refetch()
        }
    }

    return (
        <div>
            <div>
                <CompanyHeader />
            </div>
            <div className="m-4">
                <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)]">
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
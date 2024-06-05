import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import useGetAllEmployee from "../../hooks/useGetAllEmployee";
const Employee = () => {
    const [employees] = useGetAllEmployee();
    return (
        <div>
            <div>
                <CompanyHeader />
            </div>
            <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)]">
                <div className="mb-4">
                    <h1 className="md:text-5xl text-primaryColor font-bold text-center my-4 md:my-8">Employee</h1>
                </div>
                <div className="flex flex-col md:flex-row gap-2 relative">

                    <div className="flex-1 md:h-full md:min-w-56 p-3 space-y-3 flex flex-col md:min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                        <div>
                            <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
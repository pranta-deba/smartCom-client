import toast from "react-hot-toast";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetAllEmployee from "../../hooks/useGetAllEmployee";
import useGetUser from "../../hooks/useGetUser";
import { Helmet } from "react-helmet-async";


const Employee = () => {
    const [employees, , refetch] = useGetAllEmployee();
    const axiosSecure = useAxiosSecure();
    const [isUser] = useGetUser()

    const handleDelete = async id => {
        try {
            const { data } = await axiosSecure.delete(`/employee/remove/${id}?company=${isUser.company_name}`);
            console.log(data);
            if (data.deletedCount > 0) {
                toast.success("Employees removed successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            <Helmet>
                <title>Employee</title>
            </Helmet>
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
                                                <th className="p-3">Image</th>
                                                <th className="p-3">Full Name</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Type</th>
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
                                                            {item?.profile ? <img src={item?.profile} alt="" className="h-12 w-12 object-cover" /> :
                                                                <img src='https://i.ibb.co/bb493GZ/blank-user.jpg' alt="" className="h-12 w-12 object-cover" />}
                                                        </td>
                                                        <td className="p-3">
                                                            <p>{item?.full_name}</p>
                                                        </td>
                                                        <td className="p-3">
                                                            <p>{item?.email}</p>
                                                        </td>
                                                        <td className="p-3">
                                                            <p>{item?.role}</p>
                                                        </td>
                                                        <td className="p-3">
                                                            <button disabled={item.role === "HR"} onClick={() => handleDelete(item._id)} className="bg-Red text-White py-1 px-2 rounded-lg">Remove</button>
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
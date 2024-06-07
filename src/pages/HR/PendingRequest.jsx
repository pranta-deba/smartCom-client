import toast from "react-hot-toast";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useGetAllPendingRequested from "../../hooks/useGetAllPendingRequested";
import { IoCheckmarkDone } from "react-icons/io5";
import useGetUser from "../../hooks/useGetUser";
import { Helmet } from "react-helmet-async";

const PendingRequest = () => {
    const [uiLoader, setUiLoader] = useState(true);
    const axiosSecure = useAxiosSecure();
    const [all_requested, , refetch] = useGetAllPendingRequested();
    const [requests, setRequests] = useState([]);
    const [isUser] = useGetUser()

    useEffect(() => {
        setRequests(all_requested);
        setUiLoader(false)
    }, [all_requested])

    // search
    const handleSearch = async e => {
        setUiLoader(true);
        e.preventDefault()
        const search = e.target.search.value;
        try {
            const { data } = await axiosSecure.get(`/request/search?search=${search}&company=${isUser?.company_name}`);
            setRequests(data);
            setUiLoader(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleApproved = async id => {
        try {
            const { data } = await axiosSecure.patch(`/request/approved/${id}`);
            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleReject = async id => {
        try {
            const { data } = await axiosSecure.patch(`/request/rejected/${id}`);
            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
             <Helmet>
                <title>Pending Request</title>
            </Helmet>
            <div>
                <CompanyHeader />
            </div>

            <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)] p-4">
                <div className="mb-4">
                    <h1 className="md:text-5xl text-primaryColor font-bold text-center my-4 md:my-8">Pending Request</h1>
                </div>
                <div className="flex justify-end items-center">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-wrap flex-grow gap-4">
                                <div className="flex-grow">
                                    <input className="input focus:border-transparent w-full md:w-auto" placeholder="Search by name or email" name="search" required />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="btn w-full md:w-auto bg-primaryColor text-White hover:bg-primaryColor">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800 my-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead className="bg-gray-700 dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="text-center">No.</th>
                                        <th className="text-center">Asset Name</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Email of requester</th>
                                        <th className="text-center">Name of requester</th>
                                        <th className="text-center">Request Date</th>
                                        <th className="text-center">Additional note</th>
                                        <th className="text-center">Approval Date</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requests.map((item, idx) => (
                                            <tr key={item?._id} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                                                <td className="p-3 text-center">
                                                    <p>{idx + 1}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.product_name}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.type}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.requestor?.email}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.requestor?.name}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.request_date ? new Date(item?.request_date).toLocaleDateString() : "Empty"}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.additional_notes}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p>{item?.approval_date ? new Date(item?.approval_date).toLocaleDateString() : "Not approved"}</p>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <p className={`${item?.status === "approved" ? "text-success" : ""}
                                                    ${item?.status === "pending" ? "text-Red" : ""}
                                                    ${item?.status === "returned" ? "text-primaryColor" : ""}
                                                     flex justify-center`}>
                                                        {item?.status === "approved" ? <IoCheckmarkDone size={20} /> : item?.status}
                                                    </p>
                                                </td>

                                                <td className="p-3 text-center flex justify-center items-center gap-2">
                                                    {item?.status === "pending"  && <button onClick={() => handleApproved(item._id)} className="bg-primaryColor text-White py-1 px-2 rounded-lg">Approved</button>}
                                                    {item?.status === "approved" && <button onClick={() => handleReject(item._id)} className="bg-Red text-White py-1 px-2 rounded-lg">Reject</button>}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {uiLoader && <div className="animate-pulse">
                        <div className="h-12 bg-primaryColorOpacity mt-3 mb-6 rounded"></div>
                        <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                        <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                        <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                        <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default PendingRequest;
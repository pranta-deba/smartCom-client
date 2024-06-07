
import 'swiper/css';
import 'swiper/css/pagination';
import useGetAllRequested from '../../hooks/useGetAllRequested';
import { MdCancel } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../../components/Pdf/MyDocument';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../../components/Spinner/Loader';
import { GiReturnArrow } from "react-icons/gi";
import { IoCheckmarkDone } from "react-icons/io5";
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import CompanyHeader from '../../components/CompanyHeader/CompanyHeader';


const MyAssetsRequest = () => {
    const [requested_assets, , refetch] = useGetAllRequested();
    const axiosSecure = useAxiosSecure();
    const [pdfLoader, setPdfLoader] = useState(false);
    const [assetId, setAssetId] = useState('');
    const [uiLoader, setUiLoader] = useState(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        setRequests(requested_assets);
        setUiLoader(false)
    }, [requested_assets])

    const handleGetAsset = async id => {
        setAssetId(id);
        setPdfLoader(true);
        const { data: asset } = await axiosSecure.get(`/assets/${id}`);
        handleGeneratePdf(asset);
    }
    const handleGeneratePdf = async (asset) => {
        const blob = await pdf(<MyDocument asset={asset} />).toBlob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfLoader(false);
        window.open(blobUrl);
    };

    const handleCancel = async id => {
        const { data } = await axiosSecure.delete(`/request/cancel/${id}`);
        if (data.deletedCount > 0) {
            toast.success("Cancelled")
            refetch();
        }
    }
    const handleReturn = async id => {
        console.log(id);
        const { data } = await axiosSecure.put(`/request/return/${id}`);
        if (data.modifiedCount > 0) {
            toast.success("Returned successfully")
            refetch();
        }
    }

    // search
    const handleSearch = async e => {
        setUiLoader(true);
        e.preventDefault()
        const search = e.target.search.value;
        try {
            const { data } = await axiosSecure.get(`/request-search?search=${search}`);
            setRequests(data);
            setUiLoader(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // filter
    const handleFilter = e => {
        setUiLoader(true);
        const filter = e.target.value;
        if (filter == 0) {
            setRequests([])
            setTimeout(() => {
                setRequests(requested_assets)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "returnable") {
            const filtered = requested_assets.filter(asset => asset.type === "returnable");
            setRequests([]);
            setTimeout(() => {
                setRequests(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "non-returnable") {
            const filtered = requested_assets.filter(asset => asset.type === "non-returnable");
            setRequests([]);
            setTimeout(() => {
                setRequests(filtered)
                setUiLoader(false);
            }, 500);
        }
    }
    return (
        <div className='min-h-[calc(100vh-132.469px)]'>
            <Helmet>
                <title>My Request</title>
            </Helmet>
            <div>
                <CompanyHeader/>
            </div>
            <div className='max-w-[1450px] mx-auto my-4 px-4'>
                <div className="flex justify-end items-center">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-wrap flex-grow gap-4">
                                <div className="flex-grow">
                                    <input className="input focus:border-transparent w-full md:w-auto" placeholder="search items by names" name="search" required />
                                </div>
                                <select onChange={handleFilter} className="select focus:border-transparent w-full md:w-auto">
                                    <option value={0}>Filter</option>
                                    <option value={'returnable'}>returnable</option>
                                    <option value={'non-returnable'}>non-returnable</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="btn w-full md:w-auto bg-primaryColor text-White hover:bg-primaryColor">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
                        <h2 className="mb-4 text-2xl font-semibold leading-tight">My Requested Assets : </h2>
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
                                        <th className="text-center">Request Date</th>
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
                                                    <p>{item?.request_date ? new Date(item?.request_date).toLocaleDateString() : "Empty"}</p>
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
                                                    {item?.status === "pending" && <button onClick={() => handleCancel(item._id)} title='Cancel' className='bg-Red text-White rounded-full cursor-pointer'><MdCancel size={22} /></button>}

                                                    {item?.status === "approved" && item?.type === "returnable" && item?.status !== "returned" && <button onClick={() => handleReturn(item._id)} title='Return' className='cursor-pointer'><GiReturnArrow size={22} /></button>}

                                                    {
                                                        pdfLoader && assetId === item.assets_id ?
                                                            <>
                                                                <Loader size={20} color='primaryColor' />
                                                            </>
                                                            :
                                                            <>
                                                                {item?.status === "approved" || item?.status === "returned" ?
                                                                    <button title='print' onClick={() => handleGetAsset(item.assets_id)} className='cursor-pointer text-primaryColor'><IoPrintSharp size={22} /></button> : ""
                                                                }
                                                            </>
                                                    }
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

export default MyAssetsRequest;
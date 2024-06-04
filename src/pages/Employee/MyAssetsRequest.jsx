import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useGetUser from '../../hooks/useGetUser';
import useGetAllRequested from '../../hooks/useGetAllRequested';
import { MdCancel } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../../components/Pdf/MyDocument';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../../components/Spinner/Loader';
import { GiReturnArrow } from "react-icons/gi";
import { IoCheckmarkDone } from "react-icons/io5";


const MyAssetsRequest = () => {
    const [isUser] = useGetUser()
    const [requested_assets] = useGetAllRequested();
    const axiosSecure = useAxiosSecure();
    const [pdfLoader, setPdfLoader] = useState(false);
    const [assetId, setAssetId] = useState('');

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

    // search
    //   const handleSearch = async e => {
    //     setUiLoader(true);
    //     e.preventDefault()
    //     const search = e.target.search.value;
    //     try {
    //         const { data } = await axiosSecure.get(`/assets-search?search=${search}`);
    //         setAssets(data);
    //         setUiLoader(false)
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    // filter
    // const handleFilter = e => {
    //     setUiLoader(true);
    //     const filter = e.target.value;
    //     if (filter == 0) {
    //         setAssets([])
    //         setTimeout(() => {
    //             setAssets(allAssets)
    //             setUiLoader(false);
    //         }, 500);
    //     }
    //     if (filter === "available") {
    //         const filtered = allAssets.filter(asset => asset.availability === "available");
    //         setAssets([]);
    //         setTimeout(() => {
    //             setAssets(filtered)
    //             setUiLoader(false);
    //         }, 500);
    //     }
    //     if (filter === "out-of-stock") {
    //         const filtered = allAssets.filter(asset => asset.availability === "out-of-stock");
    //         setAssets([]);
    //         setTimeout(() => {
    //             setAssets(filtered)
    //             setUiLoader(false);
    //         }, 500);
    //     }
    //     if (filter === "returnable") {
    //         const filtered = allAssets.filter(asset => asset.type === "returnable");
    //         setAssets([]);
    //         setTimeout(() => {
    //             setAssets(filtered)
    //             setUiLoader(false);
    //         }, 500);
    //     }
    //     if (filter === "non-returnable") {
    //         const filtered = allAssets.filter(asset => asset.type === "non-returnable");
    //         setAssets([]);
    //         setTimeout(() => {
    //             setAssets(filtered)
    //             setUiLoader(false);
    //         }, 500);
    //     }
    // }
    return (
        <div>
            <div>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${banner})` }} className="bg-cover bg-no-repeat flex justify-center text-center py-8">
                            <div className='text-White space-y-4 max-w-[1500px] mx-auto'>
                                <h1 className='text-3xl uppercase md:text-5xl font-bold leading-tight'>{isUser?.company_name}</h1>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='max-w-[1450px] mx-auto my-4 px-4'>
                <div className="flex justify-end items-center">
                    <form className="flex">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-wrap flex-grow gap-4">
                                <div className="flex-grow">
                                    <input className="input focus:border-transparent w-full md:w-auto" placeholder="Search" name="search" required />
                                </div>
                                <select className="select focus:border-transparent w-full md:w-auto">
                                    <option value={0}>Filter</option>
                                    <option value={'available'}>available</option>
                                    <option value={'out-of-stock'}>out-of-stock</option>
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
                                        requested_assets.map((item, idx) => (
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
                                                    <p>{item?.approval_date ? item?.approval_date : "Not approved"}</p>
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
                                                    {item?.status === "pending" && <button title='Cancel' className='bg-Red text-White rounded-full cursor-pointer'><MdCancel size={22} /></button>}

                                                    {item?.status === "approved" && item?.type === "returnable" && <button title='Return' className='cursor-pointer'><GiReturnArrow size={22} /></button>}

                                                    {
                                                        pdfLoader && assetId === item.assets_id ?
                                                            <>
                                                                <Loader size={20} color='primaryColor' />
                                                            </>
                                                            :
                                                            <>
                                                                {item?.status === "approved" &&
                                                                    <button title='print' onClick={() => handleGetAsset(item.assets_id)} className='cursor-pointer text-primaryColor'><IoPrintSharp size={22} /></button>
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
                </div>
            </div>
        </div>
    );
};

export default MyAssetsRequest;
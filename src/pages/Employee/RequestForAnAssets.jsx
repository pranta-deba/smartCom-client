import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllAssets from "../../hooks/useAllAssets";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useGetUser from "../../hooks/useGetUser";
import AssetsCard from "../../components/Card/AssetsCard";
import { Helmet } from "react-helmet-async";

const RequestForAnAssets = () => {
    const [uiLoader, setUiLoader] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [allAssets, , refetch] = useAllAssets();
    const [assets, setAssets] = useState([]);
    const [isUser] = useGetUser()

    useEffect(() => {
        setAssets(allAssets);
    }, [allAssets])


    // search
    const handleSearch = async e => {
        setUiLoader(true);
        e.preventDefault()
        const search = e.target.search.value;
        try {
            const { data } = await axiosSecure.get(`/assets-search?search=${search}`);
            setAssets(data);
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
            setAssets([])
            setTimeout(() => {
                setAssets(allAssets)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "available") {
            const filtered = allAssets.filter(asset => asset.availability === "available");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "out-of-stock") {
            const filtered = allAssets.filter(asset => asset.availability === "out-of-stock");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "returnable") {
            const filtered = allAssets.filter(asset => asset.type === "returnable");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "non-returnable") {
            const filtered = allAssets.filter(asset => asset.type === "non-returnable");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
    }

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
             <Helmet>
                <title>Request For Assets</title>
            </Helmet>
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
            <div className="max-w-[1450px] mx-auto my-10 px-4">

                <div className="flex justify-end items-center">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-wrap flex-grow gap-4">
                                <div className="flex-grow">
                                    <input className="input focus:border-transparent w-full md:w-auto" placeholder="search items by names" name="search" required />
                                </div>
                                <select onChange={handleFilter} className="select focus:border-transparent w-full md:w-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mt-8">
                    {
                        assets.map(item => <AssetsCard key={item._id} item={item} refetch={refetch} />)
                    }
                    {uiLoader && <>
                        <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse ">
                            <div className="h-48 rounded-t dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-3/4 h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            </div>
                        </div>
                        <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse ">
                            <div className="h-48 rounded-t dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-3/4 h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            </div>
                        </div>
                        <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse ">
                            <div className="h-48 rounded-t dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-3/4 h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            </div>
                        </div>
                        <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse ">
                            <div className="h-48 rounded-t dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-full h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                                <div className="w-3/4 h-6 rounded dark:bg-gray-300 bg-primaryColorOpacity"></div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default RequestForAnAssets;
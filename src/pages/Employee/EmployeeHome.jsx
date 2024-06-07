import { Calendar } from 'react-date-range';
import PropTypes from 'prop-types';
import { Badge } from "@mui/material";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Marquee from "react-fast-marquee";
import useGetAllRequested from '../../hooks/useGetAllRequested';
import useAllAssets from '../../hooks/useAllAssets';
import { Link } from 'react-router-dom';
import { events } from '../../api/utils/events';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CompanyHeader from '../../components/CompanyHeader/CompanyHeader';



const EmployeeHome = ({ isUser }) => {
    const [requested_assets] = useGetAllRequested();
    const [allAssets] = useAllAssets();
    const axiosSecure = useAxiosSecure()

    const { data: notice='' } = useQuery({
        queryKey: ["events", isUser.company_Name],
        enabled: isUser.company_Name,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/notice?company=${isUser?.company_name}`)
            return data;
        }
    })

    return (
        <div className='min-h-[calc(100vh-132.469px)]'>
            <div>
                <CompanyHeader/>
            </div>
            <div className="max-w-[1450px] mx-auto md:min-h-[calc(100vh-68.500px)] my-4 p-4">
                <div className='flex gap-2 px-4'>
                    <div className='border  bg-secondaryColor text-White py-2 rounded-lg flex justify-center'>
                        <h1 className='text-[8px] md:text-base font-bold px-4'>Notice: </h1>
                    </div>
                    <Marquee speed={20}>
                        <div>{notice?.notice}</div>
                    </Marquee>
                </div>
                <div className="flex p-4 flex-col md:flex-row-reverse justify-center items-center gap-8 my-12" >
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={requested_assets.length} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <MdOutlinePending size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor capitalize text-center">My pending <br /> requests</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp />
                                    <Link to={"/my_assets_request"}>Details</Link></button>
                            </div>
                        </Badge>
                    </div>
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={requested_assets.length} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <MdOutlineCalendarMonth size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor capitalize text-center">My monthly <br /> requests</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp />
                                    <Link to={"/my_assets_request"}>Details</Link>
                                </button>
                            </div>
                        </Badge>
                    </div>
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={allAssets.length} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <RiAlignItemBottomLine size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor text-center">All Stock <br /> items</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp /> <Link to={"/request_for_an_assets"}>Details</Link></button>
                            </div>
                        </Badge>
                    </div>

                </div>
                <div className='my-12'>
                    <h1 className='text-center text-4xl font-bold'>My monthly requests</h1>
                    <div className='my-12 flex flex-col md:flex-row justify-center items-center gap-5'>
                        {
                            requested_assets.sort((a, b) => new Date(b.request_date) - new Date(a.request_date)).map(item =>
                                <div key={item._id} className='w-full'>
                                    <div className="p-6 rounded-md shadow-md  dark:bg-gray-50 dark:text-gray-900">
                                        <div className="mb-2">
                                            <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{new Date(item?.request_date).toLocaleDateString()}</span>
                                            <h2 className="text-xl font-semibold tracking-wide">{item?.product_name}</h2>
                                        </div>
                                        <button className="flex items-center"><IoArrowBackCircleSharp />
                                            <Link to={"/my_assets_request"}>Details</Link>
                                        </button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-10'>
                    <div className="">
                        <Calendar
                            color='#07332F'
                            date={new Date()}
                        />
                    </div>
                    <div className='flex-1'>
                        <h1 className='text-center text-4xl font-bold'>Events</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                            {
                                events.map((item, idx) => (
                                    <div key={idx + 10} className='shadow-sm'>
                                        <div className="p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                                            <div className="flex justify-between pb-4 border-bottom">
                                                <div className="flex items-center">
                                                    <a className="mb-0 capitalize dark:text-gray-800">{item.status}</a>
                                                </div>
                                                <a>See All</a>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <img src={item.img} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                                                    <div className="flex items-center text-xs">
                                                        <span>{new Date(item.event_date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <a className="block">
                                                        <h3 className="text-xl font-semibold dark:text-violet-600">{item.event_name} <span className='text-[10px]'>({item.organized_by})</span></h3>
                                                    </a>
                                                    <p className="leading-snug dark:text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EmployeeHome.propTypes = {
    isUser: PropTypes.object,
};

export default EmployeeHome;
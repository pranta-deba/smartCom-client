import { Calendar } from 'react-date-range';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';
import { Badge } from "@mui/material";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Marquee from "react-fast-marquee";



const EmployeeHome = ({ isUser }) => {

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
            <div className="max-w-[1450px] mx-auto md:min-h-[calc(100vh-68.500px)] my-4">
                <div className='flex gap-2 px-4'>
                    <div className='border w-[120px] md:w-[200px] bg-secondaryColor text-White py-2 rounded-lg flex justify-center'>
                        <h1 className='text-[8px] md:text-base font-bold px-2'>Important-Notice : </h1>
                    </div>
                    <Marquee speed={20}>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est odio ab quia dignissimos dolorum iure officia. Voluptate incidunt illum, quidem consequuntur, quae temporibus sint omnis doloremque quisquam vitae amet reiciendis.</div>
                    </Marquee>
                </div>
                <div className="flex p-4 flex-col md:flex-row-reverse justify-center items-center gap-8">
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={0} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <MdOutlinePending size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor capitalize text-center">My pending <br /> requests</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                            </div>
                        </Badge>
                    </div>
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={0} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <MdOutlineCalendarMonth size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor capitalize text-center">My monthly <br /> requests</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                            </div>
                        </Badge>
                    </div>
                    <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                        <Badge badgeContent={0} color="success">
                            <div className=" p-8 rounded-xl flex flex-col items-center">
                                <RiAlignItemBottomLine size={40} className="text-primaryColor" />
                                <h2 className="text-2xl font-semibold text-primaryColor text-center">All Stock <br /> items</h2>
                                <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                            </div>
                        </Badge>
                    </div>
                    <div className="shadow-xl">
                        <Calendar
                            color='#07332F'
                            date={new Date()}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='text-center text-4xl font-bold'>Events</h1>
                </div>
            </div>
        </div>
    );
};

EmployeeHome.propTypes = {
    isUser: PropTypes.object,
};

export default EmployeeHome;
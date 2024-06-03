import { Button } from "@mui/material";
import Dashboard from "../../components/Hr/Dashboard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useGetUser from "../../hooks/useGetUser";
import { useState } from "react";

const HrHome = () => {
    const [selected, setSelected] = useState('Dashboard');
    const [isUser] = useGetUser();

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
                <div className="flex flex-col lg:flex-row gap-8 relative">
                    <div className="min-w-56 p-4 space-y-3 flex flex-col md:min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                        <Button onClick={() => setSelected('Dashboard')} className={selected === 'Dashboard' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                            Dashboard
                        </Button>

                        <Button onClick={() => setSelected('Pending requests')} className={selected === 'Pending requests' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                            Pending requests
                        </Button>

                        <Button onClick={() => setSelected('All Requests')} className={selected === 'All Requests' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>All
                            Requests
                        </Button>

                        <Button onClick={() => setSelected('Requests List')} className={selected === 'Requests List' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                            Requests List
                        </Button>

                        <Button onClick={() => setSelected('Add Employee')} className={selected === 'Add Employee' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>Add Employee</Button>
                    </div>

                    <div className="flex-1 h-full min-w-56 p-3 space-y-3 flex flex-col min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                        {selected === 'Dashboard' &&
                            <Dashboard />
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
                        {selected === 'Add Employee' &&
                            <div>
                                Add Employee
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrHome;
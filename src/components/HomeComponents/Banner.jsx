import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '@mui/material';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const Banner = () => {
    return (
        <>
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
                    <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)),` }} className="bg-cover bg-no-repeat py-12 md:py-20 lg:py-40 px-12 lg:px-60 bg-[#07332F]">
                        <div className='text-White space-y-4 max-w-[1500px] mx-auto'>
                            <h1 className='text-3xl md:text-7xl font-bold leading-tight'>Your Trusted Partner in <br /> Service Provision and  Asset <br /> Management</h1>
                            <p className='text-xs md:text-lg'>Experience unparalleled service and comprehensive asset management solutions <br /> designed to optimize your investments and ensure peace of mind. Discover how our <br /> expertise can transform your asset management strategy.</p>
                            <div className='flex md:hidden'>
                                <Button variant="contained" size="small" className='!bg-secondaryColor'>
                                    <Link to={"/join_hr/15"}>Join as HR Manager</Link>
                                </Button>
                            </div>
                            <div className='hidden md:flex'>
                                <Button variant="contained" size="large" className='!bg-secondaryColor'>
                                    <Link to={"/join_hr/15"}>Join as HR Manager</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)),` }} className="bg-cover bg-no-repeat py-12 md:py-20 lg:py-40 px-12 lg:px-60 bg-[#07332F]">
                        <div className='text-White space-y-4 max-w-[1500px] mx-auto'>
                            <h1 className='text-3xl md:text-7xl font-bold leading-tight'>Your Trusted Partner in <br /> Service Provision and  Asset <br /> Management</h1>
                            <p className='text-xs md:text-lg'>Experience unparalleled service and comprehensive asset management solutions <br /> designed to optimize your investments and ensure peace of mind. Discover how our <br /> expertise can transform your asset management strategy.</p>
                            <div className='flex md:hidden'>
                                <Button variant="contained" size="small" className='!bg-secondaryColor'>
                                    <Link to={"/join_employer"}>Join as an Employee</Link>
                                </Button>
                            </div>
                            <div className='hidden md:flex'>
                                <Button variant="contained" size="large" className='!bg-secondaryColor'>
                                    <Link to={"/join_employer"}>Join as an Employee</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
import Dashboard from "../../components/Hr/Dashboard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useGetUser from "../../hooks/useGetUser";

const HrHome = () => {
    const [isUser] = useGetUser();

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
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
                <div className="flex-1 h-full min-w-56 p-3 space-y-3 flex flex-col min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default HrHome;
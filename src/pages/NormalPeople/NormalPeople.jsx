import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';

const NormalPeople = ({ isUser }) => {
    return (
        <div className='min-h-[calc(100vh-132.469px)]'>
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
                        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)),` }} className="bg-[#07332F] bg-cover bg-no-repeat flex justify-center items-center text-center py-8 min-h-[calc(100vh-68.500px)]">
                            <div className='text-White space-y-4 max-w-[1500px] mx-auto'>
                                <h1 className='text-3xl uppercase md:text-5xl font-bold leading-tight'>{isUser.company_name}</h1>
                                <h1>You are not verified, <br /> please Contact with
                                    your HR</h1>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

NormalPeople.propTypes = {
    isUser: PropTypes.object.isRequired,
};

export default NormalPeople;
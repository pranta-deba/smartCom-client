import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner from '../../assets/banner.svg'
import banner2 from '../../assets/banner2.svg'
import { Button } from '@mui/material';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


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
                    <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${banner})` }} className="bg-cover bg-no-repeat py-40 px-60">
                        <div className='text-White space-y-4'>
                            <h1 className='text-7xl font-bold leading-tight'>An Amazing App <br /> That Does It All.</h1>
                            <p>Voluptatem ipsa quae ab illo inventore veritatis et <br /> quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.</p>
                            <div>
                                <Button variant="contained" size="large" className='!bg-secondaryColor'>
                                    Join as HR Manager
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${banner2})` }} className="bg-cover bg-no-repeat py-40 px-60">
                        <div className='text-White space-y-4'>
                            <h1 className='text-7xl font-bold leading-tight'>An Amazing App <br /> That Does It All.</h1>
                            <p>Voluptatem ipsa quae ab illo inventore veritatis et <br /> quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.</p>
                            <div>
                                <Button variant="contained" size="large" className='!bg-secondaryColor'>
                                    Join as HR Manager
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
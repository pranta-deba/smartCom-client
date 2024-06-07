import useAboutData from "../../hooks/useAboutData";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Others = () => {
    const { aboutData, works } = useAboutData();
    return (
        <>
            <div className="my-20 max-w-[1500px] w-[90%] mx-auto">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        '@0.75': {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        '@1.00': {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        '@1.50': {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        aboutData.map(item => (
                            <SwiperSlide key={item?.title} className="m-0 py-4">
                                <div className="min-h-20 max-h-44 overflow-auto">
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom className="!text-3xl !font-bold !text-primaryColor">
                                                {item?.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {item?.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="my-20 max-w-[1500px] w-[90%] mx-auto">
                <h1 className="text-5xl text-center font-bold text-primaryColor">How The App Works?</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center my-12 justify-center">
                    {works.map(item => (
                        <div key={item?.title}>
                            <div className="flex items-center gap-2">
                                <h1 className="bg-primaryColor text-White w-12 h-12 flex justify-center items-center rounded-full text-2xl font-bold">{item.id}</h1>
                                <h1 className="text-3xl font-bold text-primaryColor">{item.title}</h1>
                            </div>
                            <p>{item?.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Others;
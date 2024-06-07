import img from '../../assets/about.png'

const About = () => {
    return (
        <div className="my-20 max-w-[1500px] w-[90%] mx-auto">
            <h1 className="text-5xl text-center font-bold text-primaryColor">About</h1>
            <p className="mb-8 dark:text-gray-600 text-center">Experience unparalleled service and comprehensive asset management solutions <br /> designed to optimize your investments and ensure peace of mind.</p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
                <section className="flex-1 flex justify-center">
                    <img src={img} alt="" />
                </section>
                <section className="flex-1 dark:bg-gray-100 dark:text-gray-800">
                    <div className="container flex flex-col justify-center px-4 py-4 mx-auto md:p-8">

                        <div className="space-y-4">
                            <details className="w-full border rounded-lg" open="">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What services do you offer?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">We offer a wide range of services including asset management, maintenance, and various other service provisions tailored to meet the unique needs of our clients. Our services are designed to ensure the optimal performance and longevity of your assets.</p>
                            </details>
                            <details className="w-full border rounded-lg" open="">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600"> How can I contact you for service inquiries?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">You can contact us through our websites contact form, email us at admin@gmail.com, or call us at 01XXXXXXXXX. Our team is available to answer your questions and provide the assistance you need. </p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What is asset management?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">sset management involves the systematic process of developing, operating, maintaining, and upgrading assets in a cost-effective manner. Our asset management services ensure that your assets are managed efficiently and effectively, maximizing their value and lifespan.</p>
                            </details>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default About;
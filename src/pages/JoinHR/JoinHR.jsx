import { useEffect, useState } from 'react';
import banner from '../../assets/banner.svg'
import { Btn, InputDate, InputFiles, InputPass, InputText } from '../../components/Input/Input';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import useAboutData from '../../hooks/useAboutData';

const JoinHR = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { packages } = useAboutData();
    const [selectRate, setSelectRate] = useState(0);
    useEffect(() => {
        setTimeout(() => setSelectRate(15), 1000)
    }, [])

    const handlePackages = (rate) => {
        setSelectRate(rate);
    }

    return (
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${banner})` }} className="bg-cover bg-no-repeat min-h-[calc(100vh-68.500px)] flex justify-center items-center text-White py-4 px-4 md:px-0">
            <div>
                <h1 className='text-center text-4xl font-bold'>Choose the plan for you business</h1>

                <div className='grid grid-cols-3 gap-6 md:px-12 py-4'>

                    <div onClick={() => handlePackages(5)} className={`cursor-pointer border rounded-lg p-2 md:p-4 flex flex-col justify-center items-center ${selectRate === packages[0]?.amount ? "bg-secondaryColor border-secondaryColor" : ""}`}>
                        <h1 className='text-xl md:text-3xl font-bold'>${packages[0]?.amount}</h1>
                        <ul className="dark:text-gray-600">
                            <li className="flex items-center  space-x-2 raleway">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[0]?.employees} Employees</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[0]?.expired}</span>
                            </li>
                        </ul>
                    </div>

                    <div onClick={() => handlePackages(15)} className={`cursor-pointer border rounded-lg p-2 md:p-4 flex flex-col justify-center items-center ${selectRate === packages[2]?.amount ? "bg-secondaryColor border-secondaryColor" : ""}`}>
                        <h1 className='text-xl md:text-3xl font-bold'>${packages[2]?.amount}</h1>
                        <ul className="dark:text-gray-600">
                            <li className="flex items-center  space-x-2 raleway">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[2]?.employees} Employees</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[2]?.expired}</span>
                            </li>
                        </ul>
                    </div>

                    <div onClick={() => handlePackages(8)} className={`cursor-pointer border rounded-lg p-2 md:p-4 flex flex-col justify-center items-center ${selectRate === packages[1]?.amount ? "bg-secondaryColor border-secondaryColor" : ""}`}>
                        <h1 className='text-xl md:text-3xl font-bold'>${packages[1]?.amount}</h1>
                        <ul className="dark:text-gray-600">
                            <li className="flex items-center  space-x-2 raleway">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[1]?.employees} Employees</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <IoCheckmarkDoneCircle size={15} />
                                <span className='text-[8px] md:text-xs'>{packages[1]?.expired}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <form className='p-4 md:grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Name</label>
                        <InputText type='text' name='name' label='Your Full Name' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Company</label>
                        <InputText type='text' name='company_name' label='Your Company Name' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Logo</label>
                        <InputFiles disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Email</label>
                        <InputText type='email' name='hr_email' label='Enter Your Email' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Password</label>
                        <InputPass type='password' name='password' label='Enter a Password' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Date of Birth</label>
                        <InputDate startDate={startDate} setStartDate={setStartDate} disabled={!selectRate} />
                    </div>
                    <div className='col-span-2'>
                        <Btn type='submit' text='Purchase ' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinHR;
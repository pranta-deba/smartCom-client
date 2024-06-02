import { useEffect, useState } from 'react';
import banner from '../../assets/banner.svg'
import { Btn, InputDate, InputFiles, InputPass, InputText } from '../../components/Input/Input';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import useAboutData from '../../hooks/useAboutData';
import Payment from '../../components/Modals/Payment';
import { useParams } from 'react-router-dom';


const JoinHR = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { packages } = useAboutData();
    const [selectRate, setSelectRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [hrInfo, setHrInfo] = useState({})
    const { amount } = useParams();
    useEffect(() => {
        setTimeout(() => setSelectRate(parseInt(amount)), 1000)
    }, [amount])

    const handlePackages = (rate) => {
        setSelectRate(rate);
    }

    const handleHRRequest = e => {
        e.preventDefault();
        const full_name = e.target.full_name.value;
        const company_name = e.target.company_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const company_logo = e.target.logo.files[0];
        const date_of_birth = startDate;
        const packages_rate = selectRate;
        let members;
        if (packages_rate === 5) {
            members = 5;
        } else if (packages_rate === 8) {
            members = 10;
        } else if (packages_rate === 15) {
            members = 20;
        }
        setHrInfo({ full_name, company_name, email, password, company_logo, date_of_birth, packages_rate, members });
        setIsOpen(true);
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

                <form onSubmit={handleHRRequest} className='p-4 md:grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Name</label>
                        <InputText type='text' name='full_name' label='Your Full Name' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Company</label>
                        <InputText type='text' name='company_name' label='Your Company Name' disabled={!selectRate} />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Logo</label>
                        <InputFiles disabled={!selectRate} name='logo' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Email</label>
                        <InputText type='email' name='email' label='Enter Your Email' disabled={!selectRate} />
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
                        <Btn type='submit' text='Purchase' disabled={!selectRate} />
                    </div>
                </form>
            </div>
            <div>
                <Payment selectRate={selectRate} isOpen={isOpen} setIsOpen={setIsOpen} hrInfo={hrInfo} setHrInfo={setHrInfo} />
            </div>
        </div>
    );
};

export default JoinHR;
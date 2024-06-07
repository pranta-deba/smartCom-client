import { useState } from 'react';
import { Btn, InputDate, InputPass, InputText } from '../../components/Input/Input';
import useAllCompany from '../../hooks/useAllCompany';
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../components/Spinner/Loader';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Helmet } from 'react-helmet-async';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                },
                input: {
                    color: 'white',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: 'white',
                },
            },
        },
    },
});

const JoinEmployee = () => {
    const { createUser, googleLogin } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [AllCompany] = useAllCompany();
    const [company, setCompany] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setCompany(event.target.value);
    };
    
    const handleEmployeeRequest = async e => {
        setProcessing(true)
        e.preventDefault();
        const full_name = e.target.full_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const date_of_birth = startDate;
        const company_logo = AllCompany.find(i => i.company_name === company).company_logo;

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_Base_URL}/users/employee`, {
                full_name,
                email,
                date_of_birth,
                company_name: company,
                company_logo
            })

            if (data.insertedId) {
                await createUser(email, password)
                toast.success('Successfully join.');
                navigate('/')
                setProcessing(false)
            }
        } catch (error) {
            toast.error(error.message);
            setProcessing(false)
        }
    }

    const handleGoogleLogin = async () => {
        if (!company) {
            toast.error("Please enter a company name");
            return
        }
        const company_logo = AllCompany.find(i => i.company_name === company).company_logo;
        try {
            const { user } = await googleLogin();
            if (user) {
                const { data } = await axios.post(`${import.meta.env.VITE_Base_URL}/users/employee`, {
                    full_name: user?.displayName,
                    email: user?.email,
                    date_of_birth: null,
                    company_name: company,
                    company_logo,
                    profile: user?.photoURL
                })

                if (data.insertedId) {
                    toast.success('Successfully join.')
                    navigate('/')
                    setProcessing(false)
                }
            }
        } catch (error) {
            toast.error(error.message);
            setProcessing(false)
        }



    }
    return (
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))` }} className="bg-cover bg-no-repeat flex justify-center items-center text-White py-4 px-4 md:px-0 min-h-[calc(100vh-132.469px)] bg-[#041C1C]">
            <Helmet>
                <title>Join Employee</title>
            </Helmet>
            <div>
                <h1 className='text-center text-4xl font-bold'>Joining Employee</h1>
                <div className="my-6 space-y-4 text-White">
                    <Button onClick={handleOpen} className="!flex !items-center !justify-center !w-full !p-4 !space-x-4 !rounded-md  !text-White !border-4">
                        <FcGoogle size={30} />
                        <p>Join with Google</p>
                    </Button>
                </div>
                <form onSubmit={handleEmployeeRequest} className='p-4 md:grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Name</label>
                        <InputText type='text' name='full_name' label='Your Full Name' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Email</label>
                        <InputText type='email' name='email' label='Enter Your Email' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Password</label>
                        <InputPass type='password' name='password' label='Enter a Password' />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-secondaryColor'>Date of Birth</label>
                        <InputDate startDate={startDate} setStartDate={setStartDate} />
                    </div>
                    <div className='space-y-2 col-span-2'>
                        <label className='text-secondaryColor'>Select Company</label>
                        <ThemeProvider theme={theme}>
                            <Box>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Company</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={company}
                                        label="Company"
                                        onChange={handleChange}
                                        required
                                    >
                                        {
                                            AllCompany.map((item, idx) =>
                                                <MenuItem key={idx} value={item?.company_name}>
                                                    {item?.company_name}
                                                </MenuItem>
                                            )}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ThemeProvider>
                    </div>
                    <div className='md:col-span-2 flex gap-2 items-center'>
                        <Btn type='submit' text='Sign Up' />
                        {processing && <Loader />}
                    </div>
                </form>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='!bg-primaryColor'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='!text-White !mb-3 !text-center !rounded-xl'>
                            Select Company
                        </Typography>
                        <div >
                            <ThemeProvider theme={theme}>
                                <Box>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={company}
                                            label="Company"
                                            onChange={handleChange}
                                            required
                                        >
                                            {
                                                AllCompany.map((item, idx) =>
                                                    <MenuItem key={idx} value={item?.company_name}>
                                                        {item?.company_name}
                                                    </MenuItem>
                                                )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </ThemeProvider>
                            <div className="my-6 space-y-4 text-White">
                                <Button onClick={handleGoogleLogin} className="!flex !items-center !justify-center !w-full !p-4 !space-x-4 !rounded-md  !text-White !border-4">
                                    <FcGoogle size={30} />
                                    <p>Join with Google</p>
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default JoinEmployee;
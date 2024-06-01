import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Box, Button, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'
import { Fragment } from 'react'
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';



const Login = () => {
    const { googleLogin } = useAuth();

    const [isOpen, setIsOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log({ email: email, password: password });
    };
    const handleGoogleLogin = async () => {
        try {
            const res = await googleLogin();
            if (res.user) {
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Button onClick={open} variant="contained" className='!bg-secondaryColor'>
                Login
            </Button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 border-2  p-6 backdrop-blur-3xl bg-primaryColor">
                                    <p className="text-sm text-center dark:text-gray-600 text-White">Dont have account?
                                        <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline"> Sign up here</a>
                                    </p>
                                    <div className="my-6 space-y-4 text-White">
                                        <Button onClick={handleGoogleLogin} className="!flex !items-center !justify-center !w-full !p-4 !space-x-4 !rounded-md  !text-White !border-4">
                                            <FcGoogle size={30} />
                                            <p>Login with Google</p>
                                        </Button>
                                    </div>
                                    <div className="flex items-center w-full my-4 text-White">
                                        <hr className="w-full dark:text-gray-600" />
                                        <p className="px-3 dark:text-gray-600">OR</p>
                                        <hr className="w-full dark:text-gray-600" />
                                    </div>
                                    <form onSubmit={handleLogin}>
                                        <div className='flex flex-col justify-center gap-2'>
                                            <Box
                                                sx={{
                                                    width: 500,
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    name='email'
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                color: 'white',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'white',
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: 'white',
                                                        },
                                                    }}
                                                    className='!text-White'
                                                    required
                                                />
                                            </Box>
                                            <div className='w-full text-White'>
                                                <p className='text-end cursor-pointer underline'>Forgot Password</p>
                                            </div>
                                            <Box
                                                sx={{
                                                    width: 500,
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                <div className='relative'>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-basic"
                                                        label="Password"
                                                        name='password'
                                                        type={showPassword ? 'text' : 'password'}
                                                        variant="outlined"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'white',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'white',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'white',
                                                                },
                                                                '& .MuiInputBase-input': {
                                                                    color: 'white',
                                                                },
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: 'white',
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: 'white',
                                                            },
                                                        }}
                                                        className='!text-White'
                                                        required
                                                    />
                                                    <div onClick={handleClickShowPassword} className='absolute top-4 right-3 text-White cursor-pointer'>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </div>
                                                </div>
                                            </Box>
                                            <div className='mt-3'>
                                                <Button type='submit' className='!py-2 !bg-secondaryColor' variant="contained" fullWidth>Sign In</Button>
                                            </div>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Login;
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@mui/material';
import { useState } from 'react'
import { Fragment } from 'react'
import useAuth from '../../hooks/useAuth';
import { InputPass, InputText } from '../Input/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            await loginUser(email, password);
            setIsOpen(false);
            toast.success('Login successful')
            navigate('/')
        } catch (error) {
            toast.error(error.message.split('/')[1].split(')')[0]);
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
                                    <p className="text-xl mb-2 text-center dark:text-gray-600 text-White">Sign In
                                    </p>
                                    <form onSubmit={handleLogin}>
                                        <div className='flex flex-col justify-center gap-2'>
                                            <InputText type='email' label='Email' name='email' />
                                            <div className='w-full text-White'>
                                                <p className='text-end cursor-pointer underline'>Forgot Password</p>
                                            </div>
                                            <InputPass name='password' label='Password' type='password' />
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
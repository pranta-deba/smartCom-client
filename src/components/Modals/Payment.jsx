import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../CheckOutForm/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
import payments_img from '../../assets/payment_option.png'

const Payment = ({ selectRate, isOpen, setIsOpen, hrInfo, setHrInfo }) => {

    const close = () => {
        setIsOpen(false)
    }
    return (
        <>
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
                                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 border-2  p-6 backdrop-blur-3xl text-White">
                                    <div>
                                        <div className='bg-White rounded-t-lg'>
                                            <img src={payments_img} alt="" />
                                        </div>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm selectRate={selectRate} hrInfo={hrInfo} setIsOpen={setIsOpen} setHrInfo={setHrInfo}/>
                                        </Elements>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

Payment.propTypes = {
    stripePromise: PropTypes.object,
    selectRate: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    hrInfo: PropTypes.object.isRequired,
    setHrInfo: PropTypes.func.isRequired,
}

export default Payment;
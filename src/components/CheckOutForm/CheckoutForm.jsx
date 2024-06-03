import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { Btn } from '../Input/Input';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { imageUpload } from '../../api/utils';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import Loader from '../Spinner/Loader';
import toast from 'react-hot-toast';

const CheckoutForm = ({ selectRate, hrInfo, setIsOpen, setHrInfo }) => {
    const { createUser } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if (selectRate && selectRate > 1) {
            getClientSecret({ price: selectRate })
        }
    }, [selectRate])
    const getClientSecret = async (price) => {
        const { data } = await axios.post(`${import.meta.env.VITE_Base_URL}/create-payment-intent`, price);
        setClientSecret(data.clientSecret);
    }
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            setProcessing(false)
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcessing(false)
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(error.message);
            setCardError(error.message);
            setProcessing(false)
            return;
        } else {
            setCardError('');
        }

        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: hrInfo?.email,
                        name: hrInfo?.full_name,
                    },
                },
            })
        if (confirmError) {
            toast.error(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }
        if (paymentIntent.status === 'succeeded') {
            const now = new Date();
            const expiration = new Date(now);
            expiration.setDate(now.getDate() + 30);

            try {
                // host logo 
                const image_url = await imageUpload(hrInfo.company_logo);

                // add user in db
                const { data } = await axios.post(`${import.meta.env.VITE_Base_URL}/users/hr`, {
                    full_name: hrInfo.full_name,
                    company_name: hrInfo.company_name,
                    email: hrInfo.email,
                    company_logo: image_url,
                    date_of_birth: hrInfo.date_of_birth,
                    packages_rate: hrInfo.packages_rate,
                    members: hrInfo.members,
                    purchase_date: now,
                    expiration_date: expiration,
                    transactionId: paymentIntent.id
                })
                if (data.insertedId) {
                    // firebase login
                    await createUser(hrInfo.email, hrInfo.password);
                    setIsOpen(false);
                    setHrInfo({});
                    toast.success('Payment successful.')
                    navigate('/');
                }

            } catch (err) {
                toast.error(err.message)
            }
        }
        setProcessing(false)
    };

    return (
        <>
            {cardError && <p className='text-center text-Red bg-White'>{cardError}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex gap-2 items-center'>
                    <Btn type="submit" disabled={!stripe || !clientSecret || processing} text={`Pay $${selectRate}`} />
                    {processing && <Loader />}
                </div>
            </form>
        </>
    );
};

CheckoutForm.propTypes = {
    selectRate: PropTypes.number.isRequired,
    hrInfo: PropTypes.object.isRequired,
    setIsOpen: PropTypes.func,
    setHrInfo: PropTypes.func,
};

export default CheckoutForm;
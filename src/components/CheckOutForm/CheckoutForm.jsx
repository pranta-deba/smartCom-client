import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { Btn } from '../Input/Input';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { imageUpload } from '../../api/utils';

const CheckoutForm = ({ selectRate, hrInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('')
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
                        email: hrInfo?.hr_email,
                        name: hrInfo?.full_name,
                    },
                },
            })
        if (confirmError) {
            console.log(confirmError)
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
                console.log(image_url);


                // const { data } = await axios.post(`${import.meta.env.VITE_Base_URL}/create-payment-intent`, registerHRInfo);
                // console.log(data)

                // // 3. change room status to booked in db
                // await axiosSecure.patch(`/room/status/${bookingInfo?._id}`, {
                //     status: true,
                // })

                // update ui
                // refetch()
                // closeModal()
                // toast.success('Room Booked Successfully')
                // navigate('/dashboard/my-bookings')
            } catch (err) {
                console.log(err)
            }
        }
        setProcessing(false)
    };

    return (
        <>
            {cardError && <p className='text-center text-Red'>{cardError}</p>}
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
                <Btn type="submit" disabled={!stripe || !clientSecret || processing} text={`Pay $${selectRate}`} />
            </form>
        </>
    );
};

CheckoutForm.propTypes = {
    selectRate: PropTypes.number.isRequired,
    hrInfo: PropTypes.object.isRequired,
};

export default CheckoutForm;
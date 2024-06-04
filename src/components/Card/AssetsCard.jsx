import { Button } from '@mui/material';
import { differenceInDays } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Btn } from '../Input/Input';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const AssetsCard = ({ item, refetch }) => {
    const [oldDate, setOldDate] = useState(null);
    const [counter, setCounter] = useState('');
    const [open, setOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        const getOldDate = async () => {
            setOldDate(new Date(item?.added_date));
        };

        getOldDate();
    }, [item?.added_date]);

    useEffect(() => {
        if (!oldDate) return;
        const updateCounter = () => {
            const now = new Date();
            const days = differenceInDays(now, oldDate);

            setCounter(`${days} days`);
        };
        updateCounter();
    }, [oldDate]);


    // request 
    const handleRequest = async (e) => {
        e.preventDefault();
        if (item?.quantity < 1) {
            toast.error("Asset is not available");
            return;
        }
        const additional_notes = e.target.additional_notes.value;
        const data = {
            requestor: {
                email: user?.email,
                name: user?.displayName,
                company_name: item?.company_name,
            },
            request_date: new Date(),
            image: item?.image,
            additional_notes: additional_notes,
            assets_id: item?._id,
            product_name: item?.product_name,
            type: item?.type,
            status: "pending",
        }
        try {

            const { data: res } = await axiosSecure.post('/request', data);
            if (res.insertedId) {
                toast.success("Requested successfully");
                setOpen(false);
                refetch();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 rounded-xl">
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center">
                    <a className="mb-0 capitalize dark:text-gray-800 text-primaryColor">{item?.type}</a>
                </div>
                <a className={`capitalize ${item?.availability === 'available' ? "text-primaryColor" : "text-Red"}`}>{item?.availability}</a>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={item?.image} alt="" className="block object-cover object-center w-full rounded-md h-52 dark:bg-gray-500" />
                    <div className="flex items-center justify-between text-xs">
                        <span>{counter} ago</span>
                        <span>Quantity : {item?.quantity}</span>
                    </div>
                </div>
                <div className="space-y-2 flex justify-between items-center">
                    <a className="block">
                        <h3 className="text-xl font-semibold dark:text-violet-600">{item?.product_name}</h3>
                    </a>
                    <RequestModal item={item} handleRequest={handleRequest} open={open} setOpen={setOpen} />
                </div>
            </div>
        </div>
    );
};

const RequestModal = ({ item, handleRequest, setOpen, open }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #07332F',
        boxShadow: 24,
        p: 4,
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} disabled={item?.availability == 'out-of-stock'} className={`${item?.availability == 'out-of-stock' ? "!bg-primaryColorOpacity !text-White" : "!bg-primaryColor !text-White"}`}>Request</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div>
                            <form onSubmit={handleRequest} className='flex flex-col gap-3'>
                                <textarea name="additional_notes" className='border border-primaryColor h-20' placeholder='additional notes' required></textarea>
                                <Btn bg='primaryColor' text='Request' type='submit' />
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
RequestModal.propTypes = {
    item: PropTypes.object,
    handleRequest: PropTypes.func,
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

AssetsCard.propTypes = {
    item: PropTypes.object,
    refetch: PropTypes.func,
};
export default AssetsCard;
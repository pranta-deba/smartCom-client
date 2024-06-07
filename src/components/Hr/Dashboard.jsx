import { Badge, Button } from "@mui/material";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import useGetRequestStat from "../../hooks/useGetRequestStat";
import { Link } from "react-router-dom";
import { RiUserShared2Fill } from "react-icons/ri";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    const [stats] = useGetRequestStat();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isUser] = useGetUser();
    const axiosSecure = useAxiosSecure()

    const data = [
        { label: 'Returnable', value: stats?.returnablePercentage || 0, color: '#0088FE' },
        { label: 'Non-Returnable', value: stats?.nonReturnablePercentage || 0, color: '#FF8042' },
    ];

    const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        legend: { hidden: true },
    };

    const getArcLabel = (params) => {
        return `${params.value.toFixed(0)}%`;
    };

    const handleNotice = async (e) => {
        e.preventDefault();
        const notice = e.target.notice.value;
        const message = {
            company_name: isUser?.company_name,
            notice: notice
        }
        try {
            const { data } = await axiosSecure.patch('/notice', message);
            console.log(data);
            handleClose()
            toast.success("sent notice");
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="flex p-4 flex-col-reverse md:flex-row justify-center items-center gap-8">
                <div className="flex-1 shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <MdOutlinePendingActions size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor capitalize">Pending</h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp />
                                <Link to={"/pending_requests"}>Details</Link>
                            </button>
                        </div>
                    </Badge>
                </div>
                <div className="flex-1 shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <RiUserShared2Fill size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor capitalize">requested employee</h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp /><Link to={"/employee_requests"}>Details</Link></button>
                        </div>
                    </Badge>
                </div>
                <div className="flex-1 shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <RiAlignItemBottomLine size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor">Stock items </h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp /><Link to={"/assets"}>Details</Link></button>
                        </div>
                    </Badge>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center">
                    <PieChart
                        series={[
                            {
                                outerRadius: 80,
                                data,
                                arcLabel: getArcLabel,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14,
                            },
                        }}
                        {...sizing}
                    />
                    <p className="capitalize text-center text-primaryColor">returnable <br /> non-returnable</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div>
                    <Button className="!bg-primaryColor !text-White !capitalize" onClick={handleOpen}>Send Notice</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div>
                                <form onSubmit={handleNotice}>
                                    <textarea placeholder="Write a important message for employee" name="notice" id="" className="w-full border-2 border-primaryColor h-32" required></textarea>
                                    <Button className="!bg-primaryColor !text-White !capitalize" type="submit">Send</Button>
                                </form>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
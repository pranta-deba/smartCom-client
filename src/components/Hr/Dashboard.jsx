import { Badge } from "@mui/material";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
];
const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};


const Dashboard = () => {
    return (
        <div>
            <div className="flex p-4 flex-col md:flex-row justify-center items-center gap-8">
                <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <MdOutlinePendingActions size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor capitalize">Pending</h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                        </div>
                    </Badge>
                </div>
                <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <VscGitPullRequestNewChanges size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor capitalize">requested items</h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                        </div>
                    </Badge>
                </div>
                <div className="shadow-xl rounded-lg w-full md:w-auto flex justify-center">
                    <Badge badgeContent={0} color="success">
                        <div className=" p-8 rounded-xl flex flex-col items-center">
                            <RiAlignItemBottomLine size={40} className="text-primaryColor" />
                            <h2 className="text-2xl font-semibold text-primaryColor">Stock items </h2>
                            <button className="flex items-center"><IoArrowBackCircleSharp />Details</button>
                        </div>
                    </Badge>
                </div>
                <div className="flex flex-col justify-center items-center">
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
                    <p className="capitalize text-center text-primaryColor">returnable items and <br /> non-returnable</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
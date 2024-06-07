import Dashboard from "../../components/Hr/Dashboard";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";

const HrHome = () => {

    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            <div>
                <CompanyHeader />
            </div>
            <div className="max-w-[1450px] mx-auto md:min-h-[calc(100vh-68.500px)] my-4">
                <div className="flex-1 h-full min-w-56 p-3 space-y-3 flex flex-col min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default HrHome;
import About from "../../components/HomeComponents/About";
import Banner from "../../components/HomeComponents/Banner";
import Others from "../../components/HomeComponents/Others";
import Packages from "../../components/HomeComponents/Packages";
import Loader from "../../components/Spinner/Loader";
import useAuth from "../../hooks/useAuth";
import useGetRole from "../../hooks/useGetRole";
import useGetUser from "../../hooks/useGetUser";
import EmployeeHome from "../Employee/EmployeeHome";
import HrHome from "../HR/HrHome";
import NormalPeople from "../NormalPeople/NormalPeople";
import { Helmet } from 'react-helmet-async';
const Home = () => {
    const [isRole] = useGetRole();
    const { user, userLoader } = useAuth();
    const [isUser] = useGetUser()
    if (userLoader) {
        return <div className="min-h-[calc(100vh-68.500px)] flex justify-center items-center">
            <Loader color="primaryColor" />
        </div>
    }
    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            {
                !user && !isRole && !isUser.verified ? <>
                    <Helmet>
                        <title>SmartCom</title>
                    </Helmet>
                    <Banner />
                    <About />
                    <Packages />
                    <Others />
                </> : ""
            }

            {
                user && isUser.verified && isRole === "HR" ? <>
                    <Helmet>
                        <title>{isUser?.company_name}</title>
                    </Helmet>
                    < HrHome />
                </> : ""
            }

            {
                user && !isUser.verified && <>
                    <NormalPeople isUser={isUser} />
                </>
            }

            {
                user && isUser.verified && isRole === "EMPLOYEE" && <>
                    <Helmet>
                        <title>{isUser?.company_name}</title>
                    </Helmet>
                    <EmployeeHome isUser={isUser} />
                </>
            }


        </div >
    );
};

export default Home;
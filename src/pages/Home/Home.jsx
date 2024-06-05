import About from "../../components/HomeComponents/About";
import Banner from "../../components/HomeComponents/Banner";
import Packages from "../../components/HomeComponents/Packages";
import Loader from "../../components/Spinner/Loader";
import useAuth from "../../hooks/useAuth";
import useGetRole from "../../hooks/useGetRole";
import useGetUser from "../../hooks/useGetUser";
import EmployeeHome from "../Employee/EmployeeHome";
import HrHome from "../HR/HrHome";
import NormalPeople from "../NormalPeople/NormalPeople";
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
        <div className="">
            {
                !user && !isRole && !isUser.verified ? <>
                    <Banner />
                    <About />
                    <Packages />
                </> : ""
            }

            {
                user && isUser.verified && isRole === "HR" ? <>
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
                    <EmployeeHome isUser={isUser} />
                </>
            }


        </div >
    );
};

export default Home;
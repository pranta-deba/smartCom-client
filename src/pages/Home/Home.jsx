import About from "../../components/HomeComponents/About";
import Banner from "../../components/HomeComponents/Banner";
import Packages from "../../components/HomeComponents/Packages";
import Loader from "../../components/Spinner/Loader";
import useAuth from "../../hooks/useAuth";
import useGetRole from "../../hooks/useGetRole";
const Home = () => {
    const [isRole] = useGetRole();
    const { user, userLoader } = useAuth();
    if (userLoader) {
        return <div className="min-h-[calc(100vh-68.500px)] flex justify-center items-center">
            <Loader color="primaryColor" />
        </div>
    }
    return (
        <div>
            {
                !user && !isRole ? <>
                    <Banner />
                    <About />
                    <Packages />
                </> : ""
            }
            
        </div>
    );
};

export default Home;
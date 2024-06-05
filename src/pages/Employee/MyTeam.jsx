import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import TeamCard from "../../components/TeamCard/TeamCard";
import useGetMyTeam from "../../hooks/useGetMyTeam";

const MyTeam = () => {
    const [myTeams] = useGetMyTeam();
    

    return (
        <div>
            <div>
                <CompanyHeader />
            </div>
            <div className="max-w-[1450px] mx-auto my-10 px-4">
                <h1 className="text-2xl font-semibold">My Team </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mt-8">
                    {
                        myTeams.map(item=> <TeamCard key={item._id} item={item}/>)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
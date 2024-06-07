import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import useAuth from "../../hooks/useAuth";
import banner from '../../assets/banner.svg'
import useGetUser from "../../hooks/useGetUser";
import { Button } from "@mui/material";
import { InputFiles, InputText } from "../../components/Input/Input";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import { useState } from "react";
import Loader from "../../components/Spinner/Loader";
import { Helmet } from "react-helmet-async";
const Profile = () => {
    const { user, updateUser } = useAuth()
    const [isUser] = useGetUser()
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false);


    const handleUpdateProfile = async e => {
        e.preventDefault()
        setProcessing(true)
        const full_name = e.target.full_name.value
        const image = e.target.profile.files[0];
        const email = user?.email;

        try {
            const profile = await imageUpload(image);
            const { data } = await axiosSecure.patch('/users/update',
                { profile, full_name, email })
            if (data.matchedCount > 0) {
                await updateUser(full_name, profile);
                document.getElementById('my_modal_3').close()
                setProcessing(false)
            }
        } catch (error) {
            toast.error(error.message)
            setProcessing(false)
        }


    }
    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div>
                <CompanyHeader />
            </div>
            <div className="md:my-12 bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
                <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 ease-in-out">
                    <div className="h-32 overflow-hidden">
                        <img
                            className="w-full"
                            src={banner}
                            alt=""
                        />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img
                            className="h-32 w-32 bg-white p-2 rounded-full"
                            src={user?.photoURL}
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="text-center px-14">
                            <h2 className="text-gray-800 text-3xl font-bold">{user?.displayName}</h2>
                            <a
                                className="text-gray-400 mt-2 hover:text-blue-500"
                            >
                                {isUser?.role}
                            </a>
                            <div className="mt-2 text-gray-500 text-sm">
                                <Button onClick={() => document.getElementById('my_modal_3').showModal()} className="!bg-primaryColor !text-White">Update Profile</Button>
                            </div>
                        </div>
                        <hr className="mt-6" />
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box border-2 border-primaryColor">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Update Your Profile!</h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-3">
                        <div className="form-group space-y-2">
                            <label>Full Name</label>
                            <InputText defaultValue={user?.displayName} label="Full Name" type="text" name="full_name" borderColor="black" />
                        </div>
                        <div className="form-group space-y-3">
                            <label>Profile</label>
                            <InputFiles borderColor="Black" fileTextColor="Black" name="profile" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Button type="submit" className="!bg-primaryColor !text-White">Update</Button>
                            {processing && <Loader color="primaryColor"/>}
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Profile;
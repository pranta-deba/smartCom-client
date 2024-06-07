import { useState } from "react";
import { Btn, InputFiles, InputText, SelectOption } from "../../components/Input/Input";
import Loader from "../../components/Spinner/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useAllAssets from "../../hooks/useAllAssets";
import useGetUser from "../../hooks/useGetUser";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import { Helmet } from "react-helmet-async";

const AddAssets = () => {
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [, , refetch] = useAllAssets();
    const [isUser] = useGetUser();


    // add
    const handleAddAssets = async e => {
        setProcessing(true)
        e.preventDefault();
        const product_name = e.target.product_name.value;
        const type = e.target.type.value;
        const quantity = parseInt(e.target.quantity.value);
        const availability = e.target.availability.value;
        const image = e.target.image.files[0];
        try {
            const image_url = await imageUpload(image);
            const { data } = await axiosSecure.post('/assets', { product_name, type, quantity, availability, image: image_url, company_name: isUser?.company_name, hr_name: isUser?.full_name, added_date: new Date() });
            if (data.insertedId) {
                toast.success("Added successfully");
                e.target.reset();
                setProcessing(false)
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="min-h-[calc(100vh-132.469px)]">
            <Helmet>
                <title>Add Assets</title>
            </Helmet>
            <div>
                <CompanyHeader />
            </div>
            <div className="p-4">
                <div>
                    <div className="mb-4">
                        <h1 className="md:text-5xl text-primaryColor font-bold text-center my-4 md:my-8">Add Assets</h1>
                    </div>
                    <form onSubmit={handleAddAssets} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[60%] mx-auto">

                        <InputText name="product_name" borderColor="black" label="Product Name" />

                        <SelectOption selectItem={[
                            { value: "returnable", label: 'Returnable' },
                            { value: "non-returnable", label: 'Non-Returnable' }
                        ]} label="Type" name="type" />

                        <SelectOption selectItem={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                            { value: 6, label: '6' },
                            { value: 7, label: '7' },
                            { value: 8, label: '8' },
                            { value: 9, label: '9' },
                            { value: 10, label: '10' },
                        ]} label="Quantity" name="quantity" />

                        <SelectOption selectItem={[
                            { value: "available", label: 'Available' },
                            { value: "out-of-stock", label: 'Out-Of-Stock' }
                        ]} label="Availability" name="availability" />

                        <div className="md:col-span-2">
                            <InputFiles name="image" />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Btn type="submit" bg="primaryColor" text="Add" />
                            {processing && <Loader color="primaryColor" />}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAssets;
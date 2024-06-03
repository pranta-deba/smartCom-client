import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Btn, InputFiles, InputText, SelectOption } from "../../components/Input/Input";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import Loader from "../../components/Spinner/Loader";
import useAllAssets from "../../hooks/useAllAssets";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Assets = () => {
    const [selected, setSelected] = useState('Asset List');
    const [isUser] = useGetUser();
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [uiLoader, setUiLoader] = useState(false);
    const [allAssets, , refetch] = useAllAssets();
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        setAssets(allAssets);
    }, [allAssets])

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

    // search
    const handleSearch = async e => {
        setUiLoader(true);
        e.preventDefault()
        const search = e.target.search.value;
        try {
            const { data } = await axiosSecure.get(`/assets-search?search=${search}`);
            setAssets(data);
            setUiLoader(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // filter
    const handleFilter = e => {
        setUiLoader(true);
        const filter = e.target.value;
        if (filter == 0) {
            setAssets([])
            setTimeout(() => {
                setAssets(allAssets)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "available") {
            const filtered = allAssets.filter(asset => asset.availability === "available");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "out-of-stock") {
            const filtered = allAssets.filter(asset => asset.availability === "out-of-stock");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "returnable") {
            const filtered = allAssets.filter(asset => asset.type === "returnable");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
        if (filter === "non-returnable") {
            const filtered = allAssets.filter(asset => asset.type === "non-returnable");
            setAssets([]);
            setTimeout(() => {
                setAssets(filtered)
                setUiLoader(false);
            }, 500);
        }
    }
    // sort
    const handleSort = e => {
        setUiLoader(true);
        const sort = e.target.value;
        if (sort == 0) {
            setAssets([])
            setTimeout(() => {
                setAssets(allAssets)
                setUiLoader(false);
            }, 500);
        }
        if (sort === "low-to-high") {
            const sorted = allAssets.sort((a, b) => a.quantity - b.quantity);
            setAssets([]);
            setTimeout(() => {
                setAssets(sorted)
                setUiLoader(false);
            }, 500);
        }
        if (sort === "high-to-low") {
            const sorted = allAssets.sort((a, b) => b.quantity - a.quantity);
            setAssets([]);
            setTimeout(() => {
                setAssets(sorted)
                setUiLoader(false);
            }, 500);
        }
    }

    // delete 
    const handleDelete = async id => {
        try {
            const { data } = await axiosSecure.delete(`/assets/${id}`);
            if (data.deletedCount > 0) {
                toast.success("Deleted successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // update
    const handleUpdate = async e => {
        e.preventDefault();
        const id = e.target.id.value;
        const product_name = e.target.product_name.value;
        const type = e.target.type.value;
        const quantity = parseInt(e.target.quantity.value);
        const availability = e.target.availability.value;

        try {
            const { data } = await axiosSecure.patch(`/assets/${id}`, { product_name, type, quantity, availability });
            if (data.modifiedCount > 0) {
                toast.success("Updated successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)]">
            <h1 className="text-4xl text-center font-bold my-3">Assets Management</h1>
            <div className="flex flex-col md:flex-row gap-2 relative">
                <div className="min-w-56 p-3 space-y-3 flex flex-col md:min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg md:sticky md:top-0 md:h-screen">
                    <Button onClick={() => setSelected('Asset List')} className={selected === 'Asset List' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                        Asset List
                    </Button>

                    <Button onClick={() => setSelected('Add Asset')} className={selected === 'Add Asset' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                        Add Asset
                    </Button>

                    <Button onClick={() => setSelected('All Requests')} className={selected === 'All Requests' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>All
                        Requests
                    </Button>

                    <Button onClick={() => setSelected('Requests List')} className={selected === 'Requests List' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>
                        Requests List
                    </Button>

                    <Button onClick={() => setSelected('Add Employee')} className={selected === 'Add Employee' ? "!bg-secondaryColor !text-Black" : "!bg-primaryColor !text-White !w-full"}>Add Employee</Button>
                </div>

                <div className="flex-1 h-full min-w-56 p-3 space-y-3 flex flex-col min-h-screen shadow-lg rounded-lg">

                    {selected === 'Asset List' &&
                        <div>
                            <h1 className="text-2xl text-primaryColor font-bold">All Assets</h1>
                            <div className="flex justify-end items-center">
                                <form onSubmit={handleSearch} className="flex">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex flex-wrap flex-grow gap-4">
                                            <div className="flex-grow">
                                                <input className="input focus:border-transparent w-full md:w-auto" placeholder="Search" name="search" required />
                                            </div>
                                            <select onChange={handleFilter} className="select focus:border-transparent w-full md:w-auto">
                                                <option value={0}>Filter</option>
                                                <option value={'available'}>available</option>
                                                <option value={'out-of-stock'}>out-of-stock</option>
                                                <option value={'returnable'}>returnable</option>
                                                <option value={'non-returnable'}>non-returnable</option>
                                            </select>
                                            <select onChange={handleSort} className="select focus:border-transparent w-full md:w-auto">
                                                <option value={0}>Sort by Quantity</option>
                                                <option value={'high-to-low'}>high to low</option>
                                                <option value={'low-to-high'}>low to high</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="btn w-full md:w-auto bg-primaryColor text-White hover:bg-primaryColor">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
                                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Assets : {allAssets.length}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-xs">
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                                <col className="w-24" />
                                                <col className="w-24" />
                                            </colgroup>
                                            <thead className="bg-gray-700 dark:bg-gray-300">
                                                <tr className="text-left">
                                                    <th className="p-3">No.</th>
                                                    <th className="p-3">Image</th>
                                                    <th className="p-3">Product Name</th>
                                                    <th className="p-3">Product Type</th>
                                                    <th className="p-3">Product Quantity</th>
                                                    <th className="p-3">Date Added</th>
                                                    <th className="p-3">Action</th>
                                                </tr>
                                            </thead>
                                            {!uiLoader && <tbody>
                                                {
                                                    assets.map((item, idx) => (
                                                        <tr key={item?._id} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                                                            <td className="p-3">
                                                                <p>{idx + 1}</p>
                                                            </td>
                                                            <td className="p-3">
                                                                <img src={item?.image} alt="" className="h-12 w-12 object-cover" />
                                                            </td>

                                                            <td className="p-3">
                                                                <p>{item?.product_name}</p>
                                                            </td>
                                                            <td className="p-3">
                                                                <p>{item?.type}</p>
                                                            </td>

                                                            <td className="p-3">
                                                                <p>{item?.quantity}</p>
                                                            </td>
                                                            <td className="p-3">
                                                                <p>{item?.added_date ? new Date(item?.added_date).toLocaleDateString() : "Empty"}</p>
                                                            </td>
                                                            <td className="p-3 flex gap-2 flex-col md:flex-row items-center justify-center">
                                                                <UpdateModal item={item} handleUpdate={handleUpdate} />
                                                                <ConfirmModal id={item._id} handleDelete={handleDelete} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>}
                                        </table>
                                    </div>
                                </div>
                                {uiLoader && <div className="animate-pulse">
                                    <div className="h-12 bg-primaryColorOpacity mt-3 mb-6 rounded"></div>
                                    <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                                    <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                                    <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                                    <div className="h-12 bg-primaryColorOpacity mb-6 rounded"></div>
                                </div>}
                            </div>
                        </div>
                    }
                    {selected === 'Add Asset' &&
                        <div>
                            <div className="mb-4">
                                <h1 className="text-2xl text-primaryColor font-bold">Add Assets</h1>
                            </div>
                            <form onSubmit={handleAddAssets} className="grid grid-cols-1 md:grid-cols-2 md:px-32 gap-6">

                                <InputText name="product_name" borderColor="black" label="Product Name" />

                                <SelectOption selectItem={[
                                    { value: "returnable", label: 'Returnable' },
                                    { value: "non-returnable", label: 'Non-Returnable' }
                                ]} label="Type" name="type" />

                                <InputText name="quantity" borderColor="black" label="Product Quantity" type="number" />

                                <SelectOption selectItem={[
                                    { value: "available", label: 'Available' },
                                    { value: "out-of-stock", label: 'Out-Of-Stock' }
                                ]} label="Availability" name="availability" />

                                <InputFiles name="image" />
                                <div className='flex gap-2 items-center'>
                                    <Btn type="submit" bg="primaryColor" text="Add" />
                                    {processing && <Loader color="primaryColor" />}
                                </div>
                            </form>
                        </div>
                    }
                    {selected === 'All Requests' &&
                        <div>
                            all request
                        </div>
                    }
                    {selected === 'Requests List' &&
                        <div>
                            Requests List
                        </div>
                    }
                    {selected === 'Add Employee' &&
                        <div>
                            Add Employee
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const ConfirmModal = ({ id, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #07332F',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
    };

    return (
        <div>
            <button onClick={handleOpen} className="mt-1"><AiOutlineDelete size={20} /></button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Are you sure want to delete this item.?
                    </Typography>
                    <div className="flex justify-between mt-5">
                        <button onClick={() => handleDelete(id)} className="text-Red">delete</button>
                        <button onClick={handleClose} className="text-primary">cancel</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

const UpdateModal = ({ item, handleUpdate }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        borderRadius: 4,
    };

    return (
        <div>
            <button onClick={handleOpen} className="mt-1"><FaEdit size={20} /></button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Update
                    </Typography>
                    <div className="flex mt-5">
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-2">

                            <InputText name="product_name" borderColor="black" label="Product Name" defaultValue={item['product_name']} />
                            <input type="text" defaultValue={item._id} hidden name="id" />
                            <SelectOption selectItem={[
                                { value: "returnable", label: 'Returnable' },
                                { value: "non-returnable", label: 'Non-Returnable' }
                            ]} label="Type" name="type" defaultValue={item['type']} />

                            <InputText name="quantity" borderColor="black" label="Product Quantity" type="number" defaultValue={item['quantity'].toString()} />

                            <SelectOption selectItem={[
                                { value: "available", label: 'Available' },
                                { value: "out-of-stock", label: 'Out-Of-Stock' }
                            ]} label="Availability" name="availability" defaultValue={item['availability']} />
                            <div className='col-span-2 flex gap-2 items-center'>
                                <Btn type="submit" bg="primaryColor" text="Update" />
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

ConfirmModal.propTypes = {
    id: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
}
UpdateModal.propTypes = {
    item: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
}

export default Assets;
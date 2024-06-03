import { Button } from "@mui/material";
import { useState } from "react";

const Assets = () => {
    const [selected, setSelected] = useState('Asset List');

    return (
        <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-68.500px)]">
            <h1 className="text-4xl text-center font-bold my-3">Management</h1>
            <div className="flex gap-2 relative">
                <div className="min-w-56 p-3 space-y-3 flex flex-col min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg sticky top-0 h-screen">
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

                <div className="flex-1 h-full min-w-56 p-3 space-y-3 flex flex-col min-h-[calc(100vh-140.5px)] shadow-lg rounded-lg">
                    <div>
                        <h1 className="text-2xl text-primaryColor font-bold">Assets List</h1>
                    </div>
                    {selected === 'Asset List' &&
                        <div>
                            assets list
                        </div>
                    }
                    {selected === 'Add Asset' &&
                        <div>
                            add assets
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

export default Assets;
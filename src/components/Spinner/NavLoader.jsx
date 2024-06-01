import Skeleton from '@mui/material/Skeleton';

const NavLoader = () => {
    return (
        <div className="w-full h-[70px] flex justify-between border px-6 bg-primaryColor">
            <div className='flex justify-center items-center gap-6'>
                <div className='hidden md:flex'>
                    <Skeleton variant="rectangular" width={110} height={30} />
                </div>
                <div className='space-y-2'>
                    <li className='list-none'>
                        <Skeleton variant="rectangular" width={150} height={10} />
                    </li>
                    <li className='list-none'>
                        <Skeleton variant="rectangular" width={150} height={10} />
                    </li>
                </div>

            </div>
            <div className='flex justify-center items-center'>
                <div>
                    <Skeleton variant="circular" width={40} height={40} />
                </div>
            </div>
        </div>
    );
};

export default NavLoader;
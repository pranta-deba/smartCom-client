import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './css/Navbasr.css';
import Login from '../Modals/Login';
import useAuth from '../../hooks/useAuth';
import NavLoader from '../Spinner/NavLoader';
import useGetRole from '../../hooks/useGetRole';

const Navbar = () => {
    const { user, userLoader, logOut } = useAuth()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isRole, isRoleLoading] = useGetRole();
    console.log(isRole, isRoleLoading);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (userLoader) return <NavLoader />

    return (
        <>
            <AppBar position="static" className='!bg-primaryColor !shadow-lg'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link to={"/"}>SmartCom.</Link>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {/* small screen nav item start*/}
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to={'/'} className='cursor-pointer'>Home</NavLink>
                                    </Typography>
                                </MenuItem>


                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to={'/join_employee'} className='cursor-pointer'>Join as Employee</NavLink>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to={'/join_hr'} className='cursor-pointer'>Join as HR Manager</NavLink>
                                    </Typography>
                                </MenuItem>
                                {/* small screen nav item end*/}
                            </Menu>

                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link to={"/"}>SmartCom.</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* large screen nav item start*/}
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <NavLink to={'/'} className='cursor-pointer'>Home</NavLink>
                            </Button>

                            {/* HR role navbar */}
                            {
                                user && !userLoader && isRole === 'HR' && !isRoleLoading ? (
                                    <>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            <NavLink to={'/assets'} className='cursor-pointer'>Assets</NavLink>
                                        </Button>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            <NavLink to={'/employee'} className='cursor-pointer'>Employee</NavLink>
                                        </Button>
                                    </>
                                ) : ""
                            }

                            {/* without login */}
                            {
                                !user && <>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        <NavLink to={'/join_employee'} className='cursor-pointer'>Join as Employee</NavLink>
                                    </Button>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        <NavLink to={`/join_hr/${15}`} className='cursor-pointer'>Join as HR Manager</NavLink>
                                    </Button>
                                </>
                            }

                            {/* large screen nav item end*/}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <>
                                {/* login button */}
                                {!user && <div className='space-x-2'>
                                    <Login />
                                </div>}
                                {/* user profile */}
                                {user && <Tooltip title={user?.displayName}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {user?.photoURL ? <Avatar src={user?.photoURL} /> :
                                            <Avatar alt={user?.displayName} src={"https://i.ibb.co/bj4Wj2F/images.png"} />}
                                    </IconButton>
                                </Tooltip>}
                            </>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to={'/profile'}>Profile</NavLink>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography onClick={() => {
                                        logOut()
                                    }} textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navbar;
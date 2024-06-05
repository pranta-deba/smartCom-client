import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ dropdownItem, color = 'Black', ms='0'}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={`flex items-center ms-${ms}`}>
            <Button
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={`!text-${color}`}
            >
                {dropdownItem.outerNav.outerNav}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    dropdownItem.innerNav.map((item, index) => {
                        return (
                            <MenuItem key={index} onClick={handleClose}>
                                <NavLink to={item.to}>{item.name}</NavLink>
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </div>
    );
};

Dropdown.propTypes = {
    dropdownItem: PropTypes.object.isRequired,
    color: PropTypes.string,
    ms: PropTypes.string,
};

export default Dropdown;
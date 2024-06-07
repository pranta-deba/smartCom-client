import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



// input text
const InputText = ({ name = '', type = 'text', label = "Label", borderColor = "white", textColor = "White", disabled = false, defaultValue = '' }) => {
    return (
        <Box
            sx={{
                maxWidth: '100%',
            }}
        >
            <TextField fullWidth sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: borderColor,
                    },
                    '&:hover fieldset': {
                        borderColor: borderColor,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: borderColor,
                    },
                    '& .MuiInputBase-input': {
                        color: borderColor,
                    },
                    '&.Mui-disabled fieldset': {
                        borderColor: '#5D5E59',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: borderColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: borderColor,
                },
                '& .Mui-disabled': {
                    color: 'white',
                    borderColor: "#5D5E59",
                },
            }}
                className={`!text-${textColor}`}
                required label={label} name={name} type={type} disabled={disabled} defaultValue={defaultValue}/>
        </Box>
    );
};
// input password
const InputPass = ({ name = "password", type = 'password', label = "Password", disabled = false ,defaultValue=''}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box
            sx={{
                maxWidth: '100%',
            }}
        >
            <div className='relative'>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={label}
                    name={name}
                    type={showPassword ? 'text' : type}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                    }}
                    className='!text-White'
                    required
                    disabled={disabled}
                    defaultValue={defaultValue}
                />
                <div onClick={handleClickShowPassword} className='absolute top-4 right-3 text-White cursor-pointer'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
            </div>
        </Box>
    )
}
// btn
const Btn = ({ type = "button", text = "button", bg = "secondaryColor", color = "white", width = "auto", disabled = false }) => {
    return (<Button type={type} className={`!py-2 !bg-${bg} !text-${color} !w-${width}`} variant="contained" disabled={disabled}>{text}</Button>)
}
// files
const InputFiles = ({ borderColor = 'White', fileBg = 'White', fileTextColor = 'Black', name = "", disabled = false }) => {
    const fileRef = useRef();
    const loadFile = (event) => {
        const output = fileRef.current;
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src)
        }
    };
    return (
        <div className={`flex items-center space-x-6 border border-${borderColor} rounded-md`}>
            <div className="shrink-0">
                <img ref={fileRef} className="h-14 w-14 object-cover rounded-full p-1" src="https://i.ibb.co/QfDvMs0/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-l.jpg" alt="Select Photo" />
            </div>
            <label className="block">
                <span className="sr-only">Choose Photo</span>
                <input onChange={loadFile} name={name} type="file" className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-${fileBg} file:text-${fileTextColor} cursor-pointer`} disabled={disabled} required />
            </label>
        </div>
    )
}
// date
const InputDate = ({ startDate, setStartDate, disabled = false }) => {
    return (
        <div className='border rounded-md'>
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                icon="fa fa-calendar"
                className='w-full h-full border-none outline-none m-[12px] bg-transparent rounded-md'
                disabled={disabled}
            />
        </div>
    )
}

// select 
const SelectOption = ({ label = "label", id = "idNo", selectItem = [], borderColor = 'black', name = "name" ,defaultValue=''}) => {
    const [age, setAge] = useState(defaultValue||'');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: borderColor,
                },
                '&:hover fieldset': {
                    borderColor: borderColor,
                },
                '&.Mui-focused fieldset': {
                    borderColor: borderColor,
                },
                '& .MuiInputBase-input': {
                    color: borderColor,
                },
                '&.Mui-disabled fieldset': {
                    borderColor: '#5D5E59',
                },
            },
            '& .MuiInputLabel-root': {
                color: borderColor,
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: borderColor,
            },
            '& .Mui-disabled': {
                color: 'white',
                borderColor: "#5D5E59",
            },
        }}>
            <FormControl fullWidth>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={age}
                    label={label}
                    onChange={handleChange}
                    name={name}
                    defaultValue={defaultValue}
                >
                    {
                        selectItem.map((item, index) => {
                            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>)
}



InputText.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
};
InputPass.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
};
Btn.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    bg: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.string,
    disabled: PropTypes.bool,
};

InputFiles.propTypes = {
    borderColor: PropTypes.string,
    fileBg: PropTypes.string,
    fileTextColor: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
}
InputDate.propTypes = {
    startDate: PropTypes.object,
    setStartDate: PropTypes.func,
    disabled: PropTypes.bool,
}
SelectOption.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    selectItem: PropTypes.array,
    borderColor: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
}

export { InputText, InputPass, Btn, InputFiles, InputDate, SelectOption }
import { TextField, InputAdornment } from "@mui/material";
import { memo, ChangeEventHandler, ReactNode } from "react";

export const ComponentInput = memo((
    {
        id,
        name,
        value,
        onChange,
        type,
        label,
        endAdornment = null,
        multiline = false,
        error = false,
        helperText = '',
        disabled = false,
        customSx = {},
        size = 'medium',
        width = '100%',
        height = '50px',
        fullWidth = false
    }:
        {
            id?: string,
            name: string,
            value: string | number,
            onChange?: ChangeEventHandler<HTMLInputElement>,
            type?: string,
            label: string,
            endAdornment?: ReactNode,
            multiline?: boolean,
            error?: boolean,
            helperText?: string,
            disabled?: boolean,
            customSx?: object,
            size?: 'small' | 'medium',
            width?: string | number,
            height?: string | number,
            fullWidth?: boolean
        }) => {
    return (
        <TextField
            id={id}
            type={type}
            multiline={multiline}
            label={label}
            name={name}
            value={value}
            disabled={disabled}
            size={size}
            onChange={onChange}
            autoComplete='off'
            style={{ width: width }}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            InputProps={{
                endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
                style: {
                    color: 'black',
                    height: height,
                    borderColor: '#0B815A'
                },
            }}
            sx={{
                ...{
                    padding: '2px',
                    margin: '0px',
                    '& label.Mui-focused': {
                        color: 'black',
                    },
                    '& label:not(.Mui-focused)': {
                        color: 'black',
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        height: 'fit-content',
                        '& fieldset': { borderColor: '#2F3746' },
                        '&:hover fieldset': { borderColor: '#0B815A' },
                    },
                },
                ...customSx,
            }}
        />
    );
});

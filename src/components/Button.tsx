import LoadingButton from '@mui/lab/LoadingButton';
import { memo } from 'react';

export const ComponentButton = memo(({
    type,
    text,
    onClick,
    startIcon,
    endIcon,
    disable,
    margin,
    height,
    fullWidth = false,
    loading = false,
    variant = "contained",
    sx = {},
    color
}: {
    type?: any,
    text: string,
    onClick?: any,
    startIcon?: any,
    endIcon?: any,
    disable?: boolean,
    margin?: any,
    height?: any,
    fullWidth?: boolean,
    loading?: boolean,
    variant?: any,
    sx?: object,
    color?: any
}) => {
    return (
        <LoadingButton
            loading={loading}
            type={type}
            className='mt-2'
            variant={variant}
            disableElevation
            disableRipple
            disabled={disable}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            color={color}
            fullWidth={fullWidth}
            sx={{
                fontWeight: 'bold',
                display: 'flex',
                margin: margin,
                height: height,
                ...sx
            }}
        >
            {text}
        </LoadingButton>
    );
});

import LoadingButton from '@mui/lab/LoadingButton';
import { memo, MouseEventHandler, ReactNode } from 'react';

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
    type?: "button" | "submit" | "reset",
    text: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    disable?: boolean,
    margin?: string | number,
    height?: string | number,
    fullWidth?: boolean,
    loading?: boolean,
    variant?: "contained" | "outlined" | "text",
    sx?: object,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
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

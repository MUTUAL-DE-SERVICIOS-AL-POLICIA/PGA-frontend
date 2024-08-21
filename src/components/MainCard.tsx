import { forwardRef } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

// Interfaz de props
interface MainCardProps {
    border?: boolean;
    boxShadow?: boolean;
    children?: ReactNode;
    content?: boolean;
    contentSX?: SxProps<Theme>;
    darkTitle?: boolean;
    elevation?: number;
    secondary?: ReactNode;
    shadow?: string;
    sx?: SxProps<Theme>;
    title?: ReactNode;
    [key: string]: any; // Para permitir otros props adicionales
}

// Estilo del header
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// Componente MainCard
export const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {

        return (
            <Card
                ref={ref}
                elevation={elevation || 0}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    boxShadow: boxShadow ? shadow || '0px 1px 3px rgba(0,0,0,0.2)' : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0px 2px 4px rgba(0,0,0,0.3)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {!darkTitle && title && (
                    <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
                )}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}
                {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
            </Card>
        );
    }
);


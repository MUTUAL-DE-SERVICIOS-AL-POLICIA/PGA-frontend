import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface itemsProps {
    active: boolean;
    leave: boolean;
    icon: any;
    path: any;
    title: string;
    onPress: (title: string) => void;
}

export const SideNavItem = (props: itemsProps) => {
    const {
        active = false,
        leave,
        icon = null,
        path = null,
        title,
        onPress,
    } = props;
    const linkProps = path ? { component: Link, to: path } : {};
    return (
        <ListItem
            onClick={() => onPress!(title)}
            sx={{
                display: 'block',
                px: 0.5,
                py: 0.5,
            }}>
            <ListItemButton
                sx={{
                    display: 'flex',
                    borderRadius: 1,
                    justifyContent: leave ? 'initial' : 'center',
                    border: '1px ', // Añade el borde aquí
                    background: 'white',
                    ...(active && {
                        backgroundColor: 'rgba(48, 48, 48, 1)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Cambia el color del borde al pasar el cursor
                    },
                    py: 1
                }}
                {...linkProps}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'inline-flex',
                        ...(active ? {
                            color: 'white'
                        } : {
                            color: 'FFFCF8'
                        })
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    sx={{
                        flexGrow: 1,
                        opacity: leave ? 1 : 0,
                        fontWeight: 600,
                        color: active ? 'white' : '#000000'
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

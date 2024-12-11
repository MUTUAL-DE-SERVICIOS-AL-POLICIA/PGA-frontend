import { Button, Grid, Typography, Menu, MenuItem } from "@mui/material";
import AnalyticCard from "../../../components/AnalyticCard";
import { useNavigate } from "react-router-dom";
import { TableOrder } from "./TableOrder";
import { useDashboardStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { ListAlt } from '@mui/icons-material';
export const Dashboard = () => {
    const navigate = useNavigate();
    const { dashboards, getDashboard } = useDashboardStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElSubMenu, setAnchorElSubMenu] = useState<null | HTMLElement>(null);

    useEffect(() => {
        getDashboard();
    }, []);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setAnchorElSubMenu(null);
    };

    const handleRedirect = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    const handleSubMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSubMenu(event.currentTarget);
    };

    const handleSubMenuClose = () => {
        setAnchorElSubMenu(null);
    };

    if (!dashboards) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Inicio</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCard title="Total de Material" count={dashboards['num_material']} extra={dashboards['num_material_total']} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCard title="Pedidos Pendientes" count={dashboards['num_order']} extra={dashboards['num_order_total']} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCard title="Pedidos Entregados" count={dashboards['num_delivery']} extra={dashboards['num_order_total']} />
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25, display: 'flex', gap: 2 }}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleRedirect('/createNote')}
                    >
                        Nueva Nota
                    </Button>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleRedirect('/requestView')}
                    >
                        Solicitudes
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Reportes</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        onClick={handleMenuClick}
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary">
                        Reportes
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleRedirect('/reportExistence')}>
                            <ListAlt sx={{ mr: 1 }} /> Reporte de Existencia
                        </MenuItem>
                        <MenuItem onClick={() => handleRedirect('/reportValuedPhysical')}>
                            <ListAlt sx={{ mr: 1 }} /> Inventario Fisico Valorado
                        </MenuItem>
                        <MenuItem onClick={() => handleRedirect('/reportValuedPhysicalConsolided')}>
                            <ListAlt sx={{ mr: 1 }} /> Inventario Consolidado Fisico Valorado
                        </MenuItem>
                        <MenuItem onClick={handleSubMenuClick}>
                            <ListAlt sx={{ mr: 1 }} /> Salidas
                        </MenuItem>
                    </Menu>
                    <Menu
                        anchorEl={anchorElSubMenu}
                        open={Boolean(anchorElSubMenu)}
                        onClose={handleSubMenuClose}
                    >
                        <MenuItem onClick={() => { handleRedirect('/listUserRequest'); handleSubMenuClose(); }}>
                            <ListAlt sx={{ mr: 1 }} /> Salidas por Funcionario
                        </MenuItem>
                        <MenuItem onClick={() => { handleRedirect('/listDirectoryRequest'); handleSubMenuClose(); }}>
                            <ListAlt sx={{ mr: 1 }} /> Salidas por Direcciones
                        </MenuItem>
                    </Menu>
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5"></Typography>
                </Grid>
            </Grid>
            <TableOrder />
        </>
    );
}

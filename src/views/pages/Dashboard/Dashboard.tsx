import { Button, Grid, Typography } from "@mui/material";
import AnalyticCard from "../../../components/AnalyticCard";
import { useNavigate } from "react-router-dom";
import { TableOrder } from "./TableOrder";
import { useDashboardStore } from "../../../hooks";
import { useEffect } from "react";

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleRederict = () => {
        navigate('/reportExistence');
    }

    const handleRederict1 = () => {
        navigate('/reportValuedPhysical');
    }

    const handleRederict2 = () => {
        navigate('/reportValuedPhysicalConsolided');
    }

    const { dashboards, getDashboard } = useDashboardStore();

    useEffect(() => {
        getDashboard();
    }, []);

    //console.log(dashboards);

    if (!dashboards) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Dashboard</Typography>
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
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Reportes</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button onClick={handleRederict} fullWidth size="large" variant="contained" color="primary">Reporte de Existencia</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button onClick={handleRederict1} fullWidth size="large" variant="contained" color="primary">Inventario Fisico Valorado</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Button onClick={handleRederict2} fullWidth size="large" variant="contained" color="primary">Inventario Consolidado Fisico Valorado</Button>
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5"></Typography>
                </Grid>
            </Grid>
            <TableOrder />
        </>
    );
}

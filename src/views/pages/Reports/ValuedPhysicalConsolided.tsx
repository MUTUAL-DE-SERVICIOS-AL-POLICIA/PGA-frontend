import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { SkeletonComponent } from "../../../components";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: theme.spacing(0.2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    height: '24px',
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(4, 0),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
}));

export const ValuedPhysicalConsolided = () => {
    const { report_ValuedPhy_Consolids, getReportValuedConsolid } = useReportKardexStore();

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSubmit = () => {

        console.log('Gestion Cerrada');
        setOpenConfirm(false);
    };

    const handlePrintClick = () => {
        console.log('Imprimir clicked');
    };

    const handleDownloadClick = () => {
        console.log('Descargar clicked');
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirm(false);
    };

    const handleOpenConfirmDialog = () => {
        setOpenConfirm(true);
    };

    useEffect(() => {
        getReportValuedConsolid();
    }, []);

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid container item spacing={2} alignItems="center" direction="row">

                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleOpenConfirmDialog}
                        >
                            Cerrar Gestion
                        </Button>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Imprimir">
                            <span>
                                <IconButton
                                    color="primary"
                                    onClick={handlePrintClick}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Descargar">
                            <span>
                                <IconButton
                                    color="primary"
                                    onClick={handleDownloadClick}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    INVENTARIO CONSOLIDADO FISICO VALORADO
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell rowSpan={2}>GRUPO</StyledTableCell>
                                <StyledTableCell rowSpan={2}>DETALLE</StyledTableCell>
                                <StyledTableCell colSpan={2}>SALDO GESTIÓN ANTERIOR</StyledTableCell>
                                <StyledTableCell colSpan={2}>COMPRAS DE LA GESTIÓN 2024</StyledTableCell>
                                <StyledTableCell colSpan={2}>SALIDAS DE LA GESTION 2024</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                report_ValuedPhy_Consolids == null ? <SkeletonComponent quantity={4} /> : report_ValuedPhy_Consolids.map((group: any, index: number) => (
                                    <StyledTableRow key={index}>
                                        <TableCell align="center">{group.code}</TableCell>
                                        <TableCell align="left">{group.name_group}</TableCell>
                                        <TableCell align="center">{group.previous_total_sum}</TableCell>
                                        <TableCell align="right">{group.previous_total_cost}</TableCell>
                                        <TableCell align="center">{group.latest_total_sum}</TableCell>
                                        <TableCell align="right">{group.latest_total_cost}</TableCell>
                                        <TableCell align="center">{group.latest_request_sum}</TableCell>
                                        <TableCell align="right">{group.latest_request_cost}</TableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledContainer>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirmDialog}
            >
                <DialogTitle>Confirmar Cierre de Gestión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro de que desea cerrar la gestión? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

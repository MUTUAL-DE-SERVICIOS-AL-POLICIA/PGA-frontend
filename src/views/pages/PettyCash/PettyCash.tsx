import {
    Grid, Typography, Table, TableBody, TableCell, TableRow, TableContainer, Paper,
    IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    InputLabel, Select, MenuItem
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import AnalyticCardPetty from "../../../components/AnalyticCardPetty";
import { usePettyCash } from "../../../hooks/usePettyCash";
import { useEffect, useState } from "react";

export const PettyCash = () => {
    const { petty_cashes, getDataPettyCash, PrintDiaryBook, DownloadDiaryBook, PaymentOrder, CreateDischarge } = usePettyCash();
    type DateFields = "libroDiario" | "planillaRendicion" | "descargoGeneral";

    const [selectedManagement, setSelectedManagement] = useState('');
    const [isPaymentOrderCompleted, setIsPaymentOrderCompleted] = useState(false); // Nuevo estado para seguimiento de la orden de pago
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [dialogValues, setDialogValues] = useState({
        balance: "",
        responsible: "",
    });

    useEffect(() => {
        getDataPettyCash();
    }, []);

    if (!petty_cashes || !petty_cashes.dataPettyCash) {
        return <Typography variant="h6">Cargando datos de caja chica...</Typography>;
    }

    const { date_recived, name_responsibility, concept, amount, balance, total } = petty_cashes.dataPettyCash;

    const handleSaveDate = (field: DateFields) => {
        if (selectedManagement) {
            PrintDiaryBook(field, selectedManagement);
        }
    };

    const handleDownload = (field: DateFields) => {
        if (selectedManagement) {
            DownloadDiaryBook(field, selectedManagement);
        }
    };

    const handleOpenDialog = () => {
        setDialogValues({
            balance: balance,
            responsible: name_responsibility,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const sentPaymentOrder = () => {
        PaymentOrder(petty_cashes.dataPettyCash.total, petty_cashes.dataPettyCash.name_responsibility);
        setIsPaymentOrderCompleted(true); // Marca la orden de pago como completada
    };

    const handleDialogChange = (field: keyof typeof dialogValues, value: string) => {
        setDialogValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    const handleConfirmDialog = () => {
        setOpenDialog(false);
        setOpenConfirmationDialog(true);
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };

    const handleFinalConfirm = async () => {
        await CreateDischarge(dialogValues.balance, dialogValues.responsible).then((res) => {
            if (res) {
                setOpenConfirmationDialog(false);
            }
        });
    };

    const handleManagementChange = (event: any) => {
        setSelectedManagement(event.target.value);
    };

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">{concept}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle1">Fecha de Recepción</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{date_recived}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle1">Responsable</Typography></TableCell>
                                    <TableCell><Typography variant="body1">{name_responsibility}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCardPetty title="Saldo Inicial de Caja Chica" count={amount} extra={'2'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCardPetty title="Descargo de Caja Chica" count={total} extra={'2'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <AnalyticCardPetty title="Saldo Final de Caja Chica" count={balance} extra={'2'} />
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">ACCIONES</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Libro Diario</TableCell>
                                    <TableCell>
                                        <InputLabel id="management-select-label">Seleccionar Gestión</InputLabel>
                                        <Select
                                            labelId="management-select-label"
                                            value={selectedManagement}
                                            onChange={handleManagementChange}
                                            label="Seleccionar Gestión"
                                        >
                                            {petty_cashes.discharges?.map((management: any) => (
                                                <MenuItem key={management.id} value={management.id}>
                                                    {management.id} - {management.received_amount} Bs.
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSaveDate("libroDiario")}
                                            disabled={!selectedManagement} // Deshabilita si no hay gestión seleccionada
                                        >
                                            <PrintIcon />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => handleDownload("libroDiario")}
                                            disabled={!selectedManagement} // Deshabilita si no hay gestión seleccionada
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Planilla rendición de cuentas</TableCell>
                                    <TableCell>
                                        <InputLabel id="management-select-label">Seleccionar Gestión</InputLabel>
                                        <Select
                                            labelId="management-select-label"
                                            value={selectedManagement}
                                            onChange={handleManagementChange}
                                            label="Seleccionar Gestión"
                                        >
                                            {petty_cashes.discharges?.map((management: any) => (
                                                <MenuItem key={management.id} value={management.id}>
                                                    {management.id} - {management.received_amount} Bs.
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSaveDate("planillaRendicion")}
                                            disabled={!selectedManagement} // Deshabilita si no hay gestión seleccionada
                                        >
                                            <PrintIcon />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => handleDownload("planillaRendicion")}
                                            disabled={!selectedManagement} // Deshabilita si no hay gestión seleccionada
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Realizar el descargo</TableCell>
                                    <TableCell>
                                        <Typography variant="body1">Generará el descargo general</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={sentPaymentOrder}
                                        >
                                            Orden de Pago
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpenDialog}
                                            disabled={!isPaymentOrderCompleted} // Deshabilita si no se ha realizado la orden de pago
                                        >
                                            Descargo General
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Descargo General</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Saldo Inicial"
                        type="text"
                        fullWidth
                        margin="dense"
                        value={dialogValues.balance}
                        onChange={(e) => handleDialogChange("balance", e.target.value)}
                        disabled
                    />
                    <TextField
                        label="Responsable"
                        type="text"
                        fullWidth
                        margin="dense"
                        value={dialogValues.responsible}
                        onChange={(e) => handleDialogChange("responsible", e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDialog} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
                <DialogTitle>Confirmación Final</DialogTitle>
                <DialogContent>
                    <Typography>¿Está seguro de realizar esta acción con los siguientes datos?</Typography>
                    <Typography><strong>Saldo Inicial:</strong> {dialogValues.balance}</Typography>
                    <Typography><strong>Responsable:</strong> {dialogValues.responsible}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmationDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleFinalConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

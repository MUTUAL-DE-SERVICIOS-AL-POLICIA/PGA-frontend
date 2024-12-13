import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    IconButton,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import AnalyticCardPetty from "../../../components/AnalyticCardPetty";
import { usePettyCash } from "../../../hooks/usePettyCash";
import { useEffect, useState } from "react";

export const PettyCash = () => {
    const { petty_cashes, getDataPettyCash, PrintDiaryBook, DownloadDiaryBook, PaymentOrder } = usePettyCash();
    type DateFields = "libroDiario" | "planillaRendicion" | "descargoGeneral";

    const [dates, setDates] = useState<{ [key in DateFields]: string }>({
        libroDiario: "",
        planillaRendicion: "",
        descargoGeneral: "",
    });

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

    const handleDateChange = (field: DateFields, value: string) => {
        setDates((prevDates) => ({ ...prevDates, [field]: value }));
    };

    const handleSaveDate = (field: DateFields) => {
        PrintDiaryBook(field);
    };

    const handleDownload = (field: DateFields) => {
        DownloadDiaryBook(field);
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

    const handleFinalConfirm = () => {
        console.log("Saldo Inicial:", dialogValues.balance);
        console.log("Responsable:", dialogValues.responsible);
        setOpenConfirmationDialog(false);
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
                                        <TextField
                                            label="Fecha de fin"
                                            type="date"
                                            value={dates.libroDiario}
                                            onChange={(e) => handleDateChange("libroDiario", e.target.value)}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSaveDate("libroDiario")}
                                        >
                                            <PrintIcon />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => handleDownload("libroDiario")}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Planilla rendición de cuentas</TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Fecha de fin"
                                            type="date"
                                            value={dates.planillaRendicion}
                                            onChange={(e) => handleDateChange("planillaRendicion", e.target.value)}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSaveDate("planillaRendicion")}
                                        >
                                            <PrintIcon />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => handleDownload("planillaRendicion")}
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

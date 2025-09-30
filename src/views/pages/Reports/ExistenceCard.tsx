import { TableExistence } from "./TableExistence";
import { useMaterialStore, useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Tooltip, Button, Typography, Collapse, CircularProgress } from "@mui/material";
import { MaterialModel } from "../../../models";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from "@mui/system";
import { PictureAsPdf } from "@mui/icons-material";
import { SelectMaterialComponent } from "../../../components/SelectMaterialComponet";

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const ExistenceCard = () => {

    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex, PrintReportKardex, DownloadReportKardex, DownloadReportKardexExcel } = useReportKardexStore();

    const [endDate, setEndDate] = useState(getTodayDate());
    const [startDate, setStartDate] = useState<string | undefined>();
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
    const [selectedCajaChicaId, setSelectedCajaChicaId] = useState<number | null>(null);
    const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getMaterial(0, 5000, '');
    }, []);


    useEffect(() => {
        setIsCalculateEnabled(!!selectedMaterialId || !!selectedCajaChicaId);
    }, [selectedMaterialId, selectedCajaChicaId, endDate]);


    const handleAddMaterial = (value: any) => {
        setSelectedMaterialId(value);
        setSelectedCajaChicaId(null);
    };

    const handleAddCajaChica = (value: any) => {
        setSelectedCajaChicaId(value);
        setSelectedMaterialId(null);
    };

    const handleCalculateClick = async () => {
        const idToCalculate = selectedMaterialId ?? selectedCajaChicaId;
        if (idToCalculate !== null) {
            setLoading(true);
            try {
                await getReportKardex(idToCalculate, startDate || null, endDate || null);
            } finally {
                setLoading(false);
            }
        }
    };


    const handlePrintClick = () => {
        const idToPrint = selectedMaterialId ?? selectedCajaChicaId;
        if (idToPrint !== null) {
            PrintReportKardex(idToPrint, startDate || null, endDate || null);
        }
    };


    const handleDownloadExcel = () => {
        const idToPrint = selectedMaterialId ?? selectedCajaChicaId;
        if (idToPrint !== null) {
            DownloadReportKardexExcel(idToPrint, startDate || null, endDate || null);
        }
    };

    const handleDownloadClick = () => {
        const idToDownload = selectedMaterialId ?? selectedCajaChicaId;
        if (idToDownload !== null) {
            DownloadReportKardex(idToDownload, startDate || null, endDate || null);
        }
    };

    const handleClearSelections = () => {
        setSelectedMaterialId(null);
        setSelectedCajaChicaId(null);
    };

    const availableMaterials = materials.filter((material: MaterialModel) =>
        !material.description.includes("(CAJA CHICA)")
    );

    const cajaChicaMaterials = materials.filter((material: MaterialModel) =>
        material.description.includes("(CAJA CHICA)")
    );




    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Genere el Kardex de Existencia
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                Materiales del almacén
                            </Typography>
                            <SelectMaterialComponent
                                label="Seleccionar material de almacén"
                                value={selectedMaterialId}
                                options={availableMaterials.map((m: any) => ({
                                    id: m.id,
                                    name: m.description
                                }))}
                                onChange={handleAddMaterial}
                                disabled={!!selectedCajaChicaId}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                Materiales de Caja Chica
                            </Typography>
                            <SelectMaterialComponent
                                label="Seleccionar caja chica"
                                value={selectedCajaChicaId}
                                options={cajaChicaMaterials.map((m: any) => ({
                                    id: m.id,
                                    name: m.description
                                }))}
                                onChange={handleAddCajaChica}
                                disabled={!!selectedMaterialId}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ ml: '20px', pr: 2 }}>
                    <Collapse in={!!(selectedMaterialId || selectedCajaChicaId)} timeout={300}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center" >
                                <Grid item>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Fecha Inicio
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Fecha Fin
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Acciones
                                    </Typography>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleCalculateClick}
                                                disabled={!isCalculateEnabled || loading}
                                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                            >
                                                {loading ? "Calculando..." : "Calcular"}
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={handleClearSelections}
                                            >
                                                Borrar
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Imprimir">
                                                <span>
                                                    <IconButton
                                                        color="primary"
                                                        disabled={!isCalculateEnabled}
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
                                                        disabled={!isCalculateEnabled}
                                                        onClick={handleDownloadClick}
                                                    >
                                                        <PictureAsPdf />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Imprimir EXCEL">
                                                <span>
                                                    <IconButton
                                                        color="info"
                                                        disabled={!isCalculateEnabled}
                                                        onClick={handleDownloadExcel}
                                                    >
                                                        <DownloadIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Box>

            </Grid>
            <TableExistence
                itemKardex={report_kardexs}
                date_report={startDate}
            />
        </>
    );
};

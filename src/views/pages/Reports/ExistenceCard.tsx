import { TableExistence } from "./TableExistence";
import { useMaterialStore, useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Tooltip, Button } from "@mui/material";
import { SelectComponent } from "../../../components";
import { MaterialModel } from "../../../models";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const ExistenceCard = () => {
    // Stores and hooks
    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex, PrintReportKardex, DownloadReportKardex } = useReportKardexStore();

    // States
    const [endDate, setEndDate] = useState(getTodayDate());
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
    const [selectedCajaChicaId, setSelectedCajaChicaId] = useState<number | null>(null);
    const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);

    // Fetch materials on component mount
    useEffect(() => {
        getMaterial(0, 5000, '');
    }, []);

    // Enable/Disable calculate button based on selections
    useEffect(() => {
        setIsCalculateEnabled(!!selectedMaterialId || !!selectedCajaChicaId);
    }, [selectedMaterialId, selectedCajaChicaId, endDate]);

    // Handlers
    const handleAddMaterial = (value: any) => {
        setSelectedMaterialId(value);
        setSelectedCajaChicaId(null); // Deselect "Caja Chica"
    };

    const handleAddCajaChica = (value: any) => {
        setSelectedCajaChicaId(value);
        setSelectedMaterialId(null); // Deselect "Materiales"
    };

    const handleCalculateClick = () => {
        const idToCalculate = selectedMaterialId ?? selectedCajaChicaId;
        if (idToCalculate !== null) {
            getReportKardex(idToCalculate, endDate || null);
        }
    };

    const handlePrintClick = () => {
        const idToPrint = selectedMaterialId ?? selectedCajaChicaId;
        if (idToPrint !== null) {
            PrintReportKardex(idToPrint, endDate || null);
        }
    };

    const handleDownloadClick = () => {
        const idToDownload = selectedMaterialId ?? selectedCajaChicaId;
        if (idToDownload !== null) {
            DownloadReportKardex(idToDownload, endDate || null);
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
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <SelectComponent
                                handleSelect={handleAddMaterial}
                                label=""
                                options={availableMaterials.map((material: MaterialModel) => ({
                                    id: material.id,
                                    name: material.description,
                                }))}
                                value={selectedMaterialId ?? ''}
                                disabled={!!selectedCajaChicaId} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectComponent
                                handleSelect={handleAddCajaChica}
                                label=""
                                options={cajaChicaMaterials.map((material: MaterialModel) => ({
                                    id: material.id,
                                    name: material.description,
                                }))}
                                value={selectedCajaChicaId ?? ''}
                                disabled={!!selectedMaterialId} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Fecha de fin"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCalculateClick}
                                disabled={!isCalculateEnabled}
                            >
                                Calcular
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
                                        <DownloadIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableExistence
                itemKardex={report_kardexs}
                date_report={endDate}
            />
        </>
    );
};

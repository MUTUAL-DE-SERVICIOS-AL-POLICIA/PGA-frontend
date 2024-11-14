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
    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex, PrintReportKardex, DownloadReportKardex } = useReportKardexStore();


    const [endDate, setEndDate] = useState(getTodayDate());
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
    const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);

    useEffect(() => {
        getMaterial(0, 5000, '');
    }, []);

    useEffect(() => {
        setIsCalculateEnabled(!!selectedMaterialId);
    }, [selectedMaterialId, endDate]);

    const handleAddMaterial = (value: any) => {
        const material = materials.find((material: MaterialModel) => material.id === value);
        if (material) {
            setSelectedMaterialId(material.id);
        }
    }

    const handleCalculateClick = () => {
        if (selectedMaterialId !== null) {
            getReportKardex(selectedMaterialId, endDate || null);
        }
    }

    const handlePrintClick = () => {
        if (selectedMaterialId !== null) {
            PrintReportKardex(selectedMaterialId, endDate || null);
        }
    }

    const handleDownloadClick = () => {
        if (selectedMaterialId !== null) {
            DownloadReportKardex(selectedMaterialId, endDate || null);
        }
    };

    const availableMaterials = materials.filter((material: MaterialModel) => {
        return !material.description.includes("(CAJA CHICA)");
    });

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                            <SelectComponent
                                handleSelect={handleAddMaterial}
                                label={""}
                                options={[...availableMaterials.map((material: MaterialModel) => ({ id: material.id, name: material.description }))]}
                                value={selectedMaterialId ?? ''}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Fecha de fin"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                sx={{ minWidth: 150 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={1}>
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
}

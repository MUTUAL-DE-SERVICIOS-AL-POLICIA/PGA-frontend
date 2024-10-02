import { TableExistence } from "./TableExistence";
import { useMaterialStore, useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { SelectComponent } from "../../../components";
import { MaterialModel } from "../../../models";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

export const ExistenceCard = () => {
    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex, PrintReportKardex, DownloadReportKardex } = useReportKardexStore();
    const [endDate, setEndDate] = useState('');
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

    const handleAddMaterial = (value: any) => {
        const material = materials.find((material: MaterialModel) => material.id === value);
        if (material) {
            setSelectedMaterialId(material.id);
            getReportKardex(material.id);
        }
    }

    const handlePrintClick = () => {
        if (selectedMaterialId !== null) {
            PrintReportKardex(selectedMaterialId);
        }
    }

    const handleDownloadClick = () => {
        if (selectedMaterialId !== null) {
            DownloadReportKardex(selectedMaterialId);
        }
    };

    useEffect(() => {
        getMaterial(0, 5000, '');
    }, []);

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
                            <Tooltip title="Imprimir">
                                <span>
                                    <IconButton
                                        color="primary"
                                        disabled={selectedMaterialId === null}
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
                                        disabled={selectedMaterialId === null}
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

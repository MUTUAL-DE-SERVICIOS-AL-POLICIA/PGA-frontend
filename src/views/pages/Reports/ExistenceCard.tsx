import { TableExistence } from "./TableExistence";
import { useMaterialStore, useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { SelectComponent } from "../../../components";
import { MaterialModel } from "../../../models";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

export const ExistenceCard = () => {
    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex, PrintReportKardex, DownloadReportKardex } = useReportKardexStore();

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
                    <SelectComponent
                        handleSelect={handleAddMaterial}
                        label={""}
                        options={[...availableMaterials.map((material: MaterialModel) => ({ id: material.id, name: material.description }))]}
                        value={selectedMaterialId ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Tooltip title="Imprimir">
                                <IconButton
                                    color="primary"
                                    disabled={selectedMaterialId === null}
                                    onClick={handlePrintClick}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Descargar">
                                <IconButton
                                    color="primary"
                                    disabled={selectedMaterialId === null}
                                    onClick={handleDownloadClick}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableExistence
                itemKardex={report_kardexs}
            />
        </>
    );
}

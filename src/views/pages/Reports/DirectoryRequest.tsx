import { useState } from "react";
import { Grid, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { SelectComponent } from "../../../components";
import { TableDirectoryRequest } from "./TableDirectoryRequest";
import { useUserRequestStore } from "../../../hooks";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

export const DirectoryRequest = () => {

    const { directories, getDirectoryRequest, PrintRequestDirectory, DownloadRequestDirectory } = useUserRequestStore();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const directions = [
        { id: "1", name: "Dirección de Estrategias Sociales e Inversiones" },
        { id: "2", name: "Dirección de Beneficios Económicos" },
        { id: "3", name: "Dirección de Asuntos Administrativos" },
        { id: "4", name: "Dirección de Asesoramiento jurídico administrativo y defensa interinstitucional" },
    ];

    const handleAddUser = (value: string) => {
        setSelectedUserId(value);
    };

    const handleSubmit = () => {
        getDirectoryRequest(selectedUserId, startDate || null, endDate || null);
    };

    const handlePrintClick = () => {
        if (selectedUserId !== null) {
            PrintRequestDirectory(selectedUserId, startDate || null, endDate || null);
        }
    }

    const handleDownloadClick = () => {
        if (selectedUserId !== null) {
            DownloadRequestDirectory(selectedUserId, startDate || null, endDate || null);
        }
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid container item spacing={2} alignItems="center" direction="row">
                    <Grid item xs={12} sm={3}>
                        <SelectComponent
                            handleSelect={handleAddUser}
                            label=""
                            options={directions}
                            value={selectedUserId ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Fecha Inicio"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Fecha Final"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedUserId === null}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Calcular
                        </Button>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Imprimir">
                            <span>
                                <IconButton
                                    color="primary"
                                    disabled={selectedUserId === null}
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
                                    disabled={selectedUserId === null}
                                    onClick={handleDownloadClick}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>

            <TableDirectoryRequest
                itemDirectory={directories}
            />
        </>
    );
};

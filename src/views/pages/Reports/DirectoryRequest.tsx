import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { SelectComponent } from "../../../components";
import { TableDirectoryRequest } from "./TableDirectoryRequest";
import { useUserRequestStore } from "../../../hooks";

export const DirectoryRequest = () => {

    const { directories, getDirectoryRequest } = useUserRequestStore();
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
        console.log(selectedUserId);
        getDirectoryRequest(selectedUserId);
        console.log(directories);

    };

    console.log(directories);

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <SelectComponent
                        handleSelect={handleAddUser}
                        label=""
                        options={directions}
                        value={selectedUserId ?? ''}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
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

                <Grid item xs={12} sm={4}>
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

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>

            <TableDirectoryRequest
                itemDirectory={directories}
            />
        </>
    );
};

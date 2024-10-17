import { useEffect, useState } from "react";
import { useUserRequestStore } from "../../../hooks";
import { Grid, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { SelectComponent } from "../../../components";
import { TableUserRequest } from "./TableUserRequest";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

export const UserRequest = () => {

    const { user_uniques, user_requests, getUserRequest, getRequests, PrintRequestUser, DownloadRequestUser } = useUserRequestStore();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleAddUser = (value: string) => {
        setSelectedUserId(value);
    };

    const handlePrintClick = () => {
        if (selectedUserId !== null) {
            PrintRequestUser(selectedUserId);
        }
    }

    const handleDownloadClick = () => {
        if (selectedUserId !== null) {
            DownloadRequestUser(selectedUserId);
        }
    };

    const handleCalculate = () => {
        getRequests(selectedUserId);
    };
    useEffect(() => {
        getUserRequest();
    }, []);

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <SelectComponent
                        handleSelect={handleAddUser}
                        label={""}
                        options={user_requests.map((user: any) => ({ id: user.id, name: user.full_name }))}
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

                <Grid item xs={12} sm={4}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6} sm={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleCalculate}
                                disabled={selectedUserId === null}
                                size="large"
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
            </Grid>

            <TableUserRequest
                itemKardex={user_uniques}
            />
        </>
    );
};

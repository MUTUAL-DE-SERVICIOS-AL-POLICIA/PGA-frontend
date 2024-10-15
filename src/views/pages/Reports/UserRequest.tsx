import { useEffect, useState } from "react";
import { useUserRequestStore } from "../../../hooks";
import { Grid, TextField, Button } from "@mui/material";
import { SelectComponent } from "../../../components";
import { TableUserRequest } from "./TableUserRequest";

export const UserRequest = () => {

    const { user_uniques, user_requests, getUserRequest, getRequests } = useUserRequestStore();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleAddUser = (value: string) => {
        setSelectedUserId(value);
    };

    const handleCalculate = () => {
        getRequests(selectedUserId);
    };
    useEffect(() => {
        getUserRequest();
    }, []);

    console.log(user_uniques);

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

                <Grid item xs={12} sm={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCalculate}
                        size="large"
                    >
                        Calcular
                    </Button>
                </Grid>
            </Grid>

            <TableUserRequest
                itemKardex={user_uniques}
            />
        </>
    );
};

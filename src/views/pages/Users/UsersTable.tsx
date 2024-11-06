import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, Button, Typography } from "@mui/material";
import { useUserStore } from "../../../hooks/useUserStore";
import { useEffect, useState } from "react";

export const UsersTable = () => {
    const { user_stores, getUserStore, postUserStore } = useUserStore();
    const [modifiedUsers, setModifiedUsers] = useState(new Map());

    useEffect(() => {
        getUserStore();
    }, []);

    const handleToggleActive = (userId: any) => {
        setModifiedUsers((prevModifiedUsers) => {
            const updatedUsers = new Map(prevModifiedUsers);
            const user = user_stores.find((u: any) => u.id === userId);
            if (user) {
                const isActive = updatedUsers.get(userId)?.active ?? user.active;
                updatedUsers.set(userId, { ...user, active: !isActive });
            }
            return updatedUsers;
        });
    };

    const handleSubmitChanges = () => {
        const usersToSubmit = Array.from(modifiedUsers.values());
        postUserStore(usersToSubmit);
        getUserStore();
        setModifiedUsers(new Map());
    };

    const handleCancelChanges = () => {
        setModifiedUsers(new Map());
    };

    const isButtonDisabled = () => {
        return modifiedUsers.size === 0;
    };

    return (
        <Stack spacing={2}>
            <Typography variant="body1" color="textSecondary">
                Los usuarios activados tienen permisos para aprobar recursos, mientras que los usuarios inactivos solo pueden ver reportes y recepcionar materiales.
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user_stores.map((user: any, index: number) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.position}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={modifiedUsers.get(user.id)?.active ?? user.active}
                                        onChange={() => handleToggleActive(user.id)}
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {modifiedUsers.size > 0 && (
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitChanges}
                        disabled={isButtonDisabled()}
                    >
                        Enviar Cambios
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleCancelChanges}
                    >
                        Cancelar
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};

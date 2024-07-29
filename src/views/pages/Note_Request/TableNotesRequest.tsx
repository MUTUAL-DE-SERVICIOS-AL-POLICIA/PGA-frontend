import React, { useEffect, useState } from "react";
import { useNoteRequestStore } from "../../../hooks/useNoteRequestStore";
import { NoteRequestModel } from "../../../models/NoteRequestModel";
import { IconButton, Skeleton, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ComponentTablePagination, SkeletonComponent } from "../../../components";
import { Description } from "@mui/icons-material";

interface tableProps {
    limitInit?: number;
    itemView: (note_request: NoteRequestModel) => void;
}

export const TableNotesRequest = (props: tableProps) => {

    const { limitInit = 5, itemView } = props;
    const { note_requests, flag, getNoteRequest } = useNoteRequestStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [previousCount, setPreviousCount] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const totalNotes = await getNoteRequest(page, limit, '');
            setTotal(totalNotes);
            if (totalNotes > previousCount) {
                setOpen(true);
            }
            setPreviousCount(totalNotes);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [page, limit, flag, previousCount]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack sx={{ padding: '10px' }}>
            <Typography variant="h6" gutterBottom>Notas de Solicitudes</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nro de Nota</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Solicitud</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !note_requests ? (
                                <SkeletonComponent quantity={4} />
                            ) : (
                                note_requests.map((note_request: NoteRequestModel, index: number) => (
                                    <TableRow key={index} sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell>{note_request.number_note}</TableCell>
                                        <TableCell>{note_request.employee}</TableCell>
                                        <TableCell>{note_request.request_date}</TableCell>
                                        <TableCell>{note_request.state}</TableCell>
                                        <TableCell>
                                            <Stack alignContent="center" direction="row">
                                                <IconButton sx={{ p: 2 }} onClick={() => itemView!(note_request)}>
                                                    <Description color="success" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={total}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setLimit(value)}
                page={page}
                limit={limit}
            />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Nueva Nota de Entrada!"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <Description fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

        </Stack>
    );
}

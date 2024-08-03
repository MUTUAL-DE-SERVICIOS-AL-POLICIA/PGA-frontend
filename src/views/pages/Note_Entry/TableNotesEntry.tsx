import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField } from "@mui/material";
import { useNoteEntryStore } from "../../../hooks";
import React, { useEffect, useState } from "react";
import { ComponentTablePagination, SkeletonComponent } from "../../../components";
import { NoteEntryModel } from "../../../models";
import { DeleteOutline, Description } from "@mui/icons-material";

interface tableProps {
    limitInit?: number;
    itemView?: (note_entry: NoteEntryModel) => void;
}

const getTypeTextAndColor = (typeId: number) => {
    switch (typeId) {
        case 1:
            return { text: "Almacen", color: '#1976d2' };
        case 2:
            return { text: "Caja chica", color: '#388e3c' };
        case 3:
            return { text: "Fondo de avance", color: '#fbc02d' };
        default:
            return { text: "Desconocido", color: '#000000' };
    }
};

export const TableNotesEntry = (props: tableProps) => {
    const { limitInit = 5, itemView } = props;

    const { note_entries, flag, getNoteEntry, deleteNoteEntry } = useNoteEntryStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        getNoteEntry(page, limit, '', startDate, endDate).then((total) => setTotal(total));
    }, [page, limit, flag, startDate, endDate]);

    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <Typography variant="h6" gutterBottom>Notas de Entrada</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                    label="Fecha Inicio"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{ width: 200 }} // Make input field longer
                />
                <TextField
                    label="Fecha Limite"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{ width: 200 }} // Make input field longer
                />
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nro Nota</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nro Factura</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Ingreso</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Nota de Entrada</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !note_entries ? (
                                <SkeletonComponent quantity={4} />
                            ) : (
                                note_entries.map((note_entry: NoteEntryModel, index: number) => (
                                    <TableRow key={index} sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell>{note_entry.number_note}</TableCell>
                                        <TableCell>{note_entry.invoice_number}</TableCell>
                                        <TableCell>{note_entry.delivery_date}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: getTypeTextAndColor(note_entry.type_id).color }}>
                                                {getTypeTextAndColor(note_entry.type_id).text}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack alignContent="center" direction="row">
                                                <IconButton sx={{ p: 2 }} onClick={() => itemView!(note_entry)}>
                                                    <Description color="success" />
                                                </IconButton>
                                                <IconButton sx={{ p: 2 }} onClick={() => deleteNoteEntry(note_entry)}>
                                                    <DeleteOutline color="error" />
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
        </Stack>
    );
};

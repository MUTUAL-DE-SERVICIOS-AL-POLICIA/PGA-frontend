import { useEffect, useState } from "react";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from "@mui/material";
import { ComponentTablePagination, SkeletonComponent } from "../../../components";
import { Description } from "@mui/icons-material";
import { useNoteEntryStore } from "../../../hooks";

interface TableProps {
    limitInit?: number;
    itemView: (note_aproved: any) => void;
}

export const TableNotesAproved = (props: TableProps) => {
    const { limitInit = 5, itemView } = props;
    const { note_entrie_revisions, flag, getNoteEntryRevision } = useNoteEntryStore();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [previousCount, setPreviousCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const totalNotes = await getNoteEntryRevision(page, limit, '', '');
            setTotal(totalNotes);
            setPreviousCount(totalNotes);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [page, limit, flag, previousCount]);

    const filteredNotes = note_entrie_revisions?.filter((note: any) => note.number_note !== 0);

    return (
        <Stack sx={{ padding: '10px' }}>
            <Typography variant="h6" gutterBottom>Notas por Aprobar</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nro de Nota</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Factura</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !filteredNotes ? (
                                <SkeletonComponent quantity={4} />
                            ) : (
                                filteredNotes.map((note_request: any, index: number) => (
                                    <TableRow key={index} sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell align="center">{note_request.number_note === 0 ? 'N/A' : note_request.number_note}</TableCell>
                                        <TableCell align="center">{note_request.invoice_number}</TableCell>
                                        <TableCell align="center">{note_request.delivery_date}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={note_request.state}
                                                color={
                                                    note_request.state === 'Aceptado' ? 'success' :
                                                        note_request.state === 'Cancelado' ? 'error' :
                                                            note_request.state === 'En Revision' ? 'warning' :
                                                                'default'
                                                }
                                                variant="outlined"
                                            />
                                        </TableCell>
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
        </Stack>
    );
}

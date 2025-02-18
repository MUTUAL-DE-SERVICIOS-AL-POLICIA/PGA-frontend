import { useEffect, useState } from "react";
import { useNoteRequestStore } from "../../../hooks/useNoteRequestStore";
import { NoteRequestModel } from "../../../models/NoteRequestModel";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, FormControl, Select, InputLabel, MenuItem, Chip, Switch, TextField } from "@mui/material";
import { ComponentTablePagination, SkeletonComponent } from "../../../components";
import { CheckCircle, Print } from "@mui/icons-material";

interface TableProps {
    limitInit?: number;
    itemView: (note_request: NoteRequestModel) => void;
}

export const TableNotesRequest = (props: TableProps) => {
    const { limitInit = 5, itemView } = props;
    const { note_requests, flag, getNoteRequest, PrintNoteRequest, PrintNoteRequestDelivery } = useNoteRequestStore();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [state, setState] = useState('');
    const [previousCount, setPreviousCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [filterNumberNote, setFilterNumberNote] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    console.log(open);
    useEffect(() => {
        const fetchData = async () => {
            const totalNotes = await getNoteRequest(page, limit, searchQuery, state);
            setTotal(totalNotes);
            if (totalNotes > previousCount) {
                setOpen(true);
            }
            setPreviousCount(totalNotes);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [page, limit, flag, previousCount, state, searchQuery]);

    const filteredNotes = note_requests?.filter((note: NoteRequestModel) => {
        const matchesName = note.employee.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNumber = !filterNumberNote || note.number_note !== 0;
        return matchesName && matchesNumber;
    });

    return (
        <Stack sx={{ padding: '10px' }}>
            <Typography variant="h6" gutterBottom>Notas de Solicitudes</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="state-select-label">Estado</InputLabel>
                    <Select
                        labelId="state-select-label"
                        value={state}
                        onChange={(e) => setState(e.target.value as string)}
                        label="Estado"
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="En Revision">En Revision</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                        <MenuItem value="Aceptado">Aceptado</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Buscar por Nombre"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                    fullWidth
                />
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Mostrar</Typography>
                    <Switch
                        checked={filterNumberNote}
                        onChange={() => setFilterNumberNote(!filterNumberNote)}
                        color="primary"
                    />
                </Stack>
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nro de Nota</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fecha de Solicitud</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !filteredNotes ? (
                                <SkeletonComponent quantity={4} />
                            ) : (
                                filteredNotes.map((note_request: NoteRequestModel, index: number) => (
                                    <TableRow key={index} sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell align="center">{note_request.number_note === 0 ? 'N/A' : note_request.number_note}</TableCell>
                                        <TableCell align="left">{note_request.employee}</TableCell>
                                        <TableCell align="center">{note_request.request_date}</TableCell>
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
                                                    <CheckCircle color="success" />
                                                </IconButton>
                                                {note_request.state === 'Aceptado' ? (
                                                    <IconButton sx={{ p: 2 }} onClick={() => PrintNoteRequest(note_request)}>
                                                        <Print color="info" />
                                                    </IconButton>
                                                ) : null}
                                                <IconButton sx={{ p: 2 }} onClick={() => PrintNoteRequestDelivery(note_request)}>
                                                    <Print color="error" />
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
            <ComponentTablePagination total={total} onPageChange={setPage} onRowsPerPageChange={setLimit} page={page} limit={limit} />
        </Stack>
    );
};

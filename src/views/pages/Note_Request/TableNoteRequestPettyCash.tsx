import { useEffect, useState } from "react";
import { useNoteRequestStore } from "../../../hooks/useNoteRequestStore";
import { NoteRequestModel } from "../../../models/NoteRequestModel";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, FormControl, Select, InputLabel, MenuItem, Chip, Switch, Box } from "@mui/material";
import { ComponentTablePagination, SkeletonComponent } from "../../../components";
import { CheckCircle, Print, VpnKey } from "@mui/icons-material";
import Swal from "sweetalert2";

interface TableProps {
    limitInit?: number;
    itemView: (note_request: NoteRequestModel) => void;
}

export const TableNoteRequestPettyCash = (props: TableProps) => {
    const { limitInit = 5, itemView } = props;
    const { note_requests_petty_cashs, flag, getNoteRequestPettyCash, PrintNoteRequest, Arreglar } = useNoteRequestStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [state, setState] = useState('');
    const [previousCount, setPreviousCount] = useState(0);
    const [filterNumberNote, setFilterNumberNote] = useState(false);
    const [showKeyButton, setShowKeyButton] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const totalNotes = await getNoteRequestPettyCash(page, limit, '', state);
            setTotal(totalNotes);
            setPreviousCount(totalNotes);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, [page, limit, flag, previousCount, state]);

    const handleFix = async () => {
        try {
            const response = await Arreglar();
            if (response.status === 200) {
                Swal.fire("Éxito", "La acción se realizó correctamente.", "success");
                setShowKeyButton(false); // Ocultar el botón después de la acción
            } else {
                Swal.fire("Error", "No se pudo completar la acción.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Hubo un problema al ejecutar la acción.", "error");
        }
    };

    const filteredNotes = filterNumberNote
        ? note_requests_petty_cashs?.filter((note: NoteRequestModel) => note.number_note !== 0)
        : note_requests_petty_cashs;

    return (
        <Stack sx={{ padding: '10px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>Notas de Solicitudes</Typography>

                {showKeyButton && (
                    <Box
                        sx={{
                            width: 35,
                            height: 35,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            backgroundColor: '#E0E0E0',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                        }}
                    >
                        <IconButton size="small" onClick={handleFix}>
                            <VpnKey />
                        </IconButton>
                    </Box>
                )}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="state-select-label">Estado</InputLabel>
                    <Select
                        labelId="state-select-label"
                        value={state}
                        onChange={(e) => setState(e.target.value as string)}
                        label="Estado"
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="En Revision">En Revisión</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                        <MenuItem value="Aceptado">Aceptado</MenuItem>
                    </Select>
                </FormControl>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Mostrar</Typography>
                    <Switch checked={filterNumberNote} onChange={() => setFilterNumberNote(!filterNumberNote)} color="primary" />
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
                        {!filteredNotes ? (
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
                                            {note_request.state === 'Aceptado' && (
                                                <IconButton sx={{ p: 2 }} onClick={() => PrintNoteRequest(note_request)}>
                                                    <Print color="info" />
                                                </IconButton>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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

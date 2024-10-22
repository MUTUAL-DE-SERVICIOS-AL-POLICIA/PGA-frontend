import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, DialogActions, Button, Switch, FormControlLabel, Box } from "@mui/material";
import { useMaterialStore } from "../../../hooks";
import { useEffect, useState } from "react";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any;
}

export const MaterialsDetail = (props: ViewProps) => {
    const { open, handleClose, item } = props;
    const { viewMaterial } = useMaterialStore();
    const [materialDetails, setMaterialDetails] = useState<any>(null);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        if (item != null) {
            viewMaterial(item)
                .then(data => {
                    setMaterialDetails(data);
                })
                .catch(error => {
                    console.error('Error al obtener el material:', error);
                });
        }
    }, [item]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowAll(event.target.checked);
    };

    // const filteredEntries = materialDetails?.entries.filter((entry: any) => showAll || entry.request !== 0) || [];
    const filteredEntries = (materialDetails?.entries || [])
        .filter((entry: any) => showAll || entry.request !== 0)
        .sort((a: any, b: any) => a.note_number - b.note_number);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', boxShadow: 24 } }}
        >
            <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#E2F6F0', color: '#333', padding: '16px 24px' }}>
                Visualizar Materiales
            </DialogTitle>
            <DialogContent>
                {materialDetails ? (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
                            <Box>
                                <Typography>
                                    <strong>ID del Material: </strong> {materialDetails.material_id}
                                </Typography>
                                <Typography>
                                    <strong>Descripción del Material: </strong> {materialDetails.material_description}
                                </Typography>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showAll}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                                label="Mostrar todos los registros"
                                sx={{ marginLeft: 2 }}
                            />
                        </Box>

                        <TableContainer sx={{ marginTop: 2, borderRadius: '8px', overflow: 'hidden', boxShadow: 1, backgroundColor: '#fff' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                    <TableRow>
                                        <TableCell align="center"><strong>Nro de Nota</strong></TableCell>
                                        <TableCell align="center"><strong>Fecha</strong></TableCell>
                                        <TableCell align="center"><strong>Cantidad de Ingreso</strong></TableCell>
                                        <TableCell align="center"><strong>Costo Unitario</strong></TableCell>
                                        <TableCell align="center"><strong>Costo Total</strong></TableCell>
                                        <TableCell align="center"><strong>Cantidad de Stock</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEntries.map((entry: any, index: number) => (
                                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                            <TableCell align="center">{entry.note_number}</TableCell>
                                            <TableCell align="center">{entry.date}</TableCell>
                                            <TableCell align="center">{entry.amount_entries}</TableCell>
                                            <TableCell align="right">{entry.cost_unit}</TableCell>
                                            <TableCell align="right">{entry.cost_total}</TableCell>
                                            <TableCell align="center">{entry.request}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableCell colSpan={5} align="right">Total Cantidad</TableCell>
                                        <TableCell align="center">{item.stock}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <Typography>Cargando datos...</Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button onClick={handleClose} variant="outlined" color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

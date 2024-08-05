import { Dialog, DialogTitle, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, DialogActions, Button, IconButton } from "@mui/material";
import { useMaterialStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Description } from "@mui/icons-material";
import { NoteEntryModel } from "../../../models";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any;
}

export const MaterialsDetail = (props: ViewProps) => {
    const { open, handleClose, item } = props;
    const { viewMaterial } = useMaterialStore();
    const [materialDetails, setMaterialDetails] = useState<any>(null);
    console.log(item);
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

    const itemView = async (note: NoteEntryModel) => {
        //console.log(note);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', boxShadow: 24 } }}
        >
            <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#E2F6F0', color: '#333', padding: '16px 24px' }}>
                <Typography variant="h6">Visualizar Materiales</Typography>
            </DialogTitle>
            <DialogContent>
                {materialDetails ? (
                    <>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            <Typography variant="body1"><strong>ID del Material:</strong> {materialDetails.material_id}</Typography>
                            <Typography variant="body1"><strong>Descripción del Material:</strong> {materialDetails.material_description}</Typography>
                        </DialogContentText>
                        <TableContainer sx={{ marginTop: 2, borderRadius: '8px', overflow: 'hidden', boxShadow: 1, backgroundColor: '#fff' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                    <TableRow>
                                        <TableCell><strong>Nro de Nota</strong></TableCell>
                                        <TableCell><strong>Fecha</strong></TableCell>
                                        <TableCell><strong>Cantidad de Stock</strong></TableCell>
                                        <TableCell><strong>Cantidad de Ingreso</strong></TableCell>
                                        <TableCell><strong>Costo Unitario</strong></TableCell>
                                        <TableCell><strong>Costo Total</strong></TableCell>
                                        {/* <TableCell><strong>Accion</strong></TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {materialDetails.entries.map((entry: any, index: number) => (
                                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                            <TableCell>{entry.note_number}</TableCell>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.request}</TableCell>
                                            <TableCell>{entry.amount_entries}</TableCell>
                                            <TableCell>{entry.cost_unit}</TableCell>
                                            <TableCell>{entry.cost_total}</TableCell>
                                            {/* <IconButton sx={{ p: 2 }} onClick={() => itemView(entry)}>
                                                <Description color="success" />
                                            </IconButton> */}
                                        </TableRow>
                                    ))}
                                    <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableCell colSpan={2} align="right">Total Cantidad</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell colSpan={2}></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <DialogContentText>Cargando datos...</DialogContentText>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button onClick={handleClose} variant="outlined" color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

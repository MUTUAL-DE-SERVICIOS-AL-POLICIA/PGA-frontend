import { Dialog, DialogTitle, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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

    // Calcular el total de las cantidades
    const totalAmount = materialDetails ? materialDetails.entries.reduce((sum: number, entry: any) => sum + entry.amount_entries, 0) : 0;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md" // Establece el ancho máximo del diálogo
            fullWidth // Asegura que el diálogo use el ancho completo permitido
        >
            <DialogTitle sx={{ textAlign: 'center' }}>Visualizar Materiales</DialogTitle>
            <DialogContent>
                {materialDetails ? (
                    <>
                        <DialogContentText>
                            <strong>ID del Material:</strong> {materialDetails.material_id}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Descripción del Material:</strong> {materialDetails.material_description}
                        </DialogContentText>
                        <TableContainer sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                    <TableRow>
                                        <TableCell><strong>Número de Nota</strong></TableCell>
                                        <TableCell><strong>Fecha</strong></TableCell>
                                        <TableCell><strong>Cantidad</strong></TableCell>
                                        <TableCell><strong>Costo Unitario</strong></TableCell>
                                        <TableCell><strong>Costo Total</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {materialDetails.entries.map((entry: any, index: number) => (
                                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                            <TableCell>{entry.note_number}</TableCell>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.amount_entries}</TableCell>
                                            <TableCell>{entry.cost_unit}</TableCell>
                                            <TableCell>{entry.cost_total}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={2} align="right"><strong>Total Cantidad</strong></TableCell>
                                        <TableCell><strong>{totalAmount}</strong></TableCell>
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
        </Dialog>
    );
}

import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, Typography, Divider, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any | null;
}

export const ViewNoteRequest = (props: ViewProps) => {
    const { open, handleClose, item } = props;
    const [materials, setMaterials] = useState(item?.materials || []);
    useEffect(() => {
        if (item) {
            setMaterials(item.materials.map((material: any) => ({
                ...material,
                amount_to_deliver: material.amount_to_deliver || '',
                original_stock: material.stock
            })));
        }
    }, [item]);

    const handleAmountToDeliverChange = (index: number, value: string) => {
        const newMaterials = [...materials];
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue) && parsedValue >= 0) {
            newMaterials[index].amount_to_deliver = value;
            newMaterials[index].stock = newMaterials[index].original_stock - parsedValue;
        } else {
            newMaterials[index].amount_to_deliver = '';
            newMaterials[index].stock = newMaterials[index].original_stock;
        }
        setMaterials(newMaterials);
    };

    const handleSubmit = (status: string) => {
        const dataToSend = {
            noteRequestId: item.id_note,
            materials: materials.map((material: any) => ({
                id_material: material.id,
                amount_to_deliver: status === 'Cancelled' ? null : material.amount_to_deliver
            })),
            status
        };
        console.log('Sending data:', dataToSend);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ textAlign: 'center', background: '#E2F6F0', color: '#333', padding: '16px' }}>
                <Typography>Visualizar Solicitud</Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: '24px' }}>
                {item && (
                    <div>
                        <Table size="small" sx={{ marginBottom: 2 }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Número de Nota:</TableCell>
                                    <TableCell>{item.number_note}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Solicitud:</TableCell>
                                    <TableCell>{item.request_date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Solicitante:</TableCell>
                                    <TableCell>{item.employee}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Estado:</TableCell>
                                    <TableCell>{item.state}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Divider sx={{ my: 2, borderBottom: '2px solid #E2F6F0' }} />

                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Visualizar Materiales</Typography>
                        <Table size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                            <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Unidad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Cantidad Requerida</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Stock</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Cantidad a Entregar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map((material: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{material.code_material}</TableCell>
                                        <TableCell>{material.description}</TableCell>
                                        <TableCell>{material.unit_material}</TableCell>
                                        <TableCell>{material.amount_request}</TableCell>
                                        <TableCell>{material.stock}</TableCell>
                                        <TableCell>
                                            <TextField
                                                value={material.amount_to_deliver || ''}
                                                onChange={(e) => handleAmountToDeliverChange(index, e.target.value)}
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 0 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px' }}>
                <Button onClick={() => handleSubmit('Approved')} variant="outlined" color="success">Aprobar</Button>
                <Button onClick={() => handleSubmit('Cancelled')} variant="outlined" color="error">Anular</Button>
                <Button onClick={handleClose} variant="outlined" color="info">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

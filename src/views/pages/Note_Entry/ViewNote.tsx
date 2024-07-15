import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, Typography, Divider, DialogActions, Button } from "@mui/material";
import { NoteEntryModel } from "../../../models";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: NoteEntryModel | null;
}

export const ViewNote = (props: ViewProps) => {
    const { open, handleClose, item } = props;

    // Función para obtener el texto y color del tipo de nota
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

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ textAlign: 'center' }}>Visualizar Nota de Entrada</DialogTitle>
            <DialogContent sx={{ pb: 4 }}>
                {item && (
                    <div>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Número de Nota:</TableCell>
                                    <TableCell>{item.number_note}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Número de Factura:</TableCell>
                                    <TableCell>{item.invoice_number}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Ingreso:</TableCell>
                                    <TableCell>{item.delivery_date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Autorización de Factura:</TableCell>
                                    <TableCell>{item.invoice_auth}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Nota de Entrada:</TableCell>
                                    <TableCell>{getTypeTextAndColor(item.type_id).text}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Divider sx={{ my: 2, borderBottom: '2px solid #000000' }} />

                        <Typography variant="h6" gutterBottom>Visualizar Materiales</Typography>
                        <Table size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                            <TableHead sx={{ background: '#E2F6F0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Unidad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Cantidad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Costo Unitario</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Costo Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.materials.map((material, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{material.id}</TableCell>
                                        <TableCell>{material.code_material}</TableCell>
                                        <TableCell>{material.description}</TableCell>
                                        <TableCell>{material.unit_material}</TableCell>
                                        <TableCell>{material.pivot?.amount_entries}</TableCell>
                                        <TableCell>{material.pivot?.cost_unit}</TableCell>
                                        <TableCell>{material.pivot?.cost_total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CERRAR</Button>
            </DialogActions>
        </Dialog>
    );
};

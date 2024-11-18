import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, Typography, Divider, DialogActions, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { useNoteEntryStore } from "../../../hooks";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any | null;
}

export const NoteViewAproveed = (props: ViewProps) => {
    const { open, handleClose, item } = props;
    const [materials, setMaterials] = useState(item?.materials || []);
    const { postNoteEntryApproved } = useNoteEntryStore();

    useEffect(() => {
        if (item) {
            setMaterials(item.materials.map((material: any) => ({
                ...material,
                amount_entries: material.pivot.amount_entries || '',   
                cost_unit: material.pivot.cost_unit || ''             
            })));
        }
    }, [item]);

    const handleAmountEntriesChange = (index: number, value: string) => {
        const newMaterials = [...materials];
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue) && parsedValue >= 0) {
            newMaterials[index].amount_entries = parsedValue;
        } else {
            newMaterials[index].amount_entries = '';
        }
        setMaterials(newMaterials);
    };

    const handleCostUnitChange = (index: number, value: string) => {
        const newMaterials = [...materials];
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue) && parsedValue >= 0) {
            newMaterials[index].cost_unit = parsedValue;
        } else {
            newMaterials[index].cost_unit = '';
        }
        setMaterials(newMaterials);
    };

    const handleSubmit = async (status: string) => {
        const dataToSend = {
            noteEntryId: item.id,
            materials: materials.map((material: any) => ({
                id_material: material.id,
                amount_entries: material.amount_entries,
                cost_unit: material.cost_unit
            })),
            status,
            comment: '' 
        };


        await postNoteEntryApproved(dataToSend).then((res) => {
            if (res) {
                handleClose();
            }
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ textAlign: 'center', background: '#E2F6F0', color: '#333', padding: '16px', position: 'relative' }}>
                <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Visualizar Solicitud</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: '#333' }}
                >
                    <CloseIcon />
                </IconButton>
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
                                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha Entrada:</TableCell>
                                    <TableCell>{item.delivery_date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Proveedor:</TableCell>
                                    <TableCell>{item.name_supplier}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Estado:</TableCell>
                                    <TableCell>{item.state}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Divider sx={{ my: 2, borderBottom: '2px solid #E2F6F0' }} />

                        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Visualizar Materiales</Typography>
                        <Table size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                            <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Unidad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Cantidad Ingresada</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Precio Unitario</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map((material: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{material.code_material}</TableCell>
                                        <TableCell>{material.description}</TableCell>
                                        <TableCell>{material.unit_material}</TableCell>
                                        <TableCell>
                                            <TextField
                                                value={material.amount_entries || ''}
                                                onChange={(e) => handleAmountEntriesChange(index, e.target.value)}
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 0 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={material.cost_unit || ''}
                                                onChange={(e) => handleCostUnitChange(index, e.target.value)}
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 0, step: 0.01 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px', flexDirection: 'column', alignItems: 'center' }}>
                <Button onClick={() => handleSubmit('Approved')} variant="contained" color="success">
                    Aprobar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

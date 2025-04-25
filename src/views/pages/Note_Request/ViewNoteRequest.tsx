import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, Typography, Divider, DialogActions, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { useNoteRequestStore } from "../../../hooks/useNoteRequestStore";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any | null;
}

export const ViewNoteRequest = (props: ViewProps) => {
    const { open, handleClose, item } = props;
    const [materials, setMaterials] = useState(item?.materials || []);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cancelComment, setCancelComment] = useState('');
    const [approveComment, setApproveComment] = useState('');
    const { postNoteRequest, PrintNoteRequest } = useNoteRequestStore();

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
            if (parsedValue <= newMaterials[index].amount_request && parsedValue <= newMaterials[index].original_stock) {
                newMaterials[index].amount_to_deliver = parsedValue;
                newMaterials[index].stock = newMaterials[index].original_stock - parsedValue;
            } else {
                newMaterials[index].amount_to_deliver = Math.min(newMaterials[index].amount_request, newMaterials[index].original_stock);
                newMaterials[index].stock = newMaterials[index].original_stock - newMaterials[index].amount_to_deliver;
            }
        } else {
            newMaterials[index].amount_to_deliver = '';
            newMaterials[index].stock = newMaterials[index].original_stock;
        }
        setMaterials(newMaterials);
    };

    const canApprove = () => {
        return materials.every((material: any) => material.amount_to_deliver !== '' || material.amount_to_deliver > 0);
    };

    // const handleSubmit = async (status: string) => {
    //     setIsLoading(true);
    //     const dataToSend = {
    //         noteRequestId: item.id_note,
    //         materials: materials.map((material: any) => ({
    //             id_material: material.id,
    //             amount_to_deliver: status === 'Cancelled' ? null : material.amount_to_deliver
    //         })),
    //         status,
    //         comment: status === 'Cancelled' ? cancelComment : approveComment
    //     };

    //     try {
    //         const res = await postNoteRequest(dataToSend);
    //         if (res) {
    //             PrintNoteRequest(res);
    //             handleClose();
    //         }
    //     } finally {
    //         setIsLoading(false);
    //         setIsApproving(false);
    //         setIsCancelling(false);
    //         setApproveComment('');
    //         setCancelComment('');
    //     }
    // };


    const handleSubmit = async (status: string) => {
        setIsLoading(true);

        const dataToSend = {
            noteRequestId: item.id_note,
            materials: materials.map((material: any) => ({
                id_material: material.id,
                amount_to_deliver: status === 'Cancelled' ? null : material.amount_to_deliver
            })),
            status,
            comment: status === 'Cancelled' ? cancelComment : approveComment
        };

        try {
            const [res] = await Promise.all([
                postNoteRequest(dataToSend),
                new Promise(resolve => setTimeout(resolve, 2000)) 
            ]);

            if (res) {
                PrintNoteRequest(res);
                handleClose();
            }
        } finally {
            setIsLoading(false);
            setIsApproving(false);
            setIsCancelling(false);
            setApproveComment('');
            setCancelComment('');
        }
    };

    const handleCancel = () => {
        if (isCancelling) {
            handleSubmit('Cancelled');
        } else {
            setIsCancelling(true);
        }
    };

    const handleApprove = () => {
        if (isApproving) {
            handleSubmit('Approved');
        } else {
            setIsApproving(true);
        }
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
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Comentario:</TableCell>
                                    <TableCell>{item.observation_request}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Divider sx={{ my: 2, borderBottom: '2px solid #E2F6F0' }} />

                        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Visualizar Materiales</Typography>
                        <Table size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                            <TableHead sx={{ backgroundColor: '#E2F6F0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Unidad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Cantidad Requerida</TableCell>
                                    {item.state !== 'Aceptado' && item.state !== 'Cancelado' && (
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0', color: '#555' }}>Stock</TableCell>
                                    )}
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
                                        {item.state !== 'Aceptado' && item.state !== 'Cancelado' && (
                                            <TableCell>{material.stock}</TableCell>
                                        )}
                                        <TableCell>
                                            {item.state === 'Cancelado' ? (
                                                <Typography>0</Typography>
                                            ) : item.state === 'Aceptado' ? (
                                                <Typography>{material.delivered_quantity}</Typography>
                                            ) : (
                                                <TextField
                                                    value={material.amount_to_deliver !== '' ? material.amount_to_deliver : ''}
                                                    onChange={(e) => handleAmountToDeliverChange(index, e.target.value)}
                                                    size="small"
                                                    type="number"
                                                    inputProps={{
                                                        min: 0,
                                                        max: material.amount_request,
                                                        onWheel: (e: any) => e.target.blur()
                                                    }}
                                                    onWheel={(e) => e.preventDefault()}
                                                    sx={{
                                                        width: '100px',
                                                        textAlign: 'center',
                                                        '& input[type=number]': {
                                                            MozAppearance: 'textfield',
                                                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                                WebkitAppearance: 'none',
                                                                margin: 0,
                                                            },
                                                        }
                                                    }}
                                                />

                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px', flexDirection: 'column', alignItems: 'center' }}>
                {isApproving && (
                    <TextField
                        label="Comentario de Aprobación"
                        value={approveComment}
                        onChange={(e) => setApproveComment(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                )}
                {isCancelling && (
                    <TextField
                        label="Comentario de Cancelación"
                        value={cancelComment}
                        onChange={(e) => setCancelComment(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                )}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {(item.state !== 'Aceptado' && item.state !== 'Cancelado') && (
                        <>
                            <Button
                                onClick={handleApprove}
                                variant="contained"
                                color="success"
                                sx={{ boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)', borderRadius: '8px', marginRight: '8px' }}
                                disabled={!canApprove() || isLoading}
                            >
                                {isLoading ? 'Aprobando...' : isApproving ? 'Confirmar Aprobación' : 'Aprobar'}
                            </Button>

                            <Button
                                onClick={handleCancel}
                                variant="contained"
                                color="error"
                                sx={{ boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)', borderRadius: '8px', marginLeft: '8px' }}
                            >
                                {isCancelling ? 'Confirmar Cancelación' : 'Anular'}
                            </Button>
                        </>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    );
};

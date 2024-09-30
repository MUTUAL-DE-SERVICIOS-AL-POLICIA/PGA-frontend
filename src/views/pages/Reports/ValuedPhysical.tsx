import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider, Grid, Tooltip, IconButton, MenuItem, Select, FormControl, InputLabel, TextField, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useReportKardexStore } from '../../../hooks';
import React, { useState } from 'react';
import { SkeletonComponent } from '../../../components';
import { Stack } from '@mui/system';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

const StyledHeaderCell = styled(TableCell)({
    backgroundColor: '#0B815A',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '0.75rem',
    border: '1px solid #ddd',  
    padding: '2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '100px',
});

const StyledDescriptionCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '0.75rem',
    width: '400px',
    maxWidth: '400px',
    border: '1px solid #ddd',  
    backgroundColor: '#fff', 
});

const StyledBodyCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '100px',
    fontSize: '0.7rem',
    border: '1px solid #ddd',  
    backgroundColor: '#fff',  
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5', 
    },
    height: '24px',
});


const StyledContainer = styled(Paper)({
    margin: '32px 0',
    borderRadius: '4px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)',
});

export const ValuedPhysical = () => {
    const { getReportValued, report_ValuedPhys, PrintReportValued, DownloadReportValued } = useReportKardexStore();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [loading, setLoading] = useState(false); 
    const [openDialog, setOpenDialog] = useState(false); 

    const handleUpdateClick = () => {
        setOpenDialog(true); 
    };

    const confirmUpdate = () => {
        setOpenDialog(false); 
        setLoading(true); 
        if (startDate && endDate) {
            getReportValued(startDate, endDate).finally(() => {
                setLoading(false); 
            });
        } else {
            getReportValued().finally(() => {
                setLoading(false); 
            }); 
        }
    };

    const cancelUpdate = () => {
        setOpenDialog(false);
    };

    const getFormattedEndDate = () => {
        const today = new Date();
        const todayDate = today.getDate();
        const currentYear = today.getFullYear();

        let endDateObj;

        if (endDate) {
            endDateObj = new Date(endDate);
        } else {
            endDateObj = new Date(`${currentYear}-${today.getMonth() + 1}-${todayDate}`);
        }

        const formattedDate = endDateObj.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();

        return formattedDate;
    };

    const handlePrintClick = () => {
        setLoading(true); 
        PrintReportValued(startDate, endDate).finally(() => {
            setLoading(false); 
        });
    };

    const handleDownLoadClick = () => {
        setLoading(true); 
        DownloadReportValued(startDate, endDate).finally(() => {
            setLoading(false); 
        });
    };

    const handleGroupChange = (event: any) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <>
            <Stack direction="row" marginTop={3} spacing={2} sx={{ mb: 2 }}>
                <TextField
                    label="Fecha de inicio"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{ minWidth: 200 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Fecha de fin"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{ minWidth: 200 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl sx={{ minWidth: 500 }}>
                    <InputLabel>Seleccionar Grupo</InputLabel>
                    <Select
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        label="Seleccionar Grupo"
                    >
                        <MenuItem value="">Todos los Grupos</MenuItem>
                        {report_ValuedPhys.data?.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.codigo_grupo}>
                                {item.grupo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid item xs={12} sm={4}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Tooltip title="Actualizar">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateClick}
                                    disabled={loading}
                                >
                                    Actualizar
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Imprimir">
                                <IconButton
                                    color="primary"
                                    onClick={handlePrintClick}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : <PrintIcon />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Descargar">
                                <IconButton
                                    color="primary"
                                    onClick={handleDownLoadClick}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : <DownloadIcon />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>

            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    INVENTARIO FISICO VALORADO
                </Typography>
                <Typography align="center" gutterBottom>
                    LA PAZ DEL {startDate ? new Date(startDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).toUpperCase() : report_ValuedPhys.date_note} AL {getFormattedEndDate()}
                </Typography>
                <Typography align="center" gutterBottom>
                    (EXPRESADO EN BOLIVIANOS)
                </Typography>

                {loading ? ( 
                    <CircularProgress sx={{ display: 'block', margin: 'auto', padding: '20px' }} />
                ) : report_ValuedPhys.data == null ? (
                    <Typography variant="body2" align="center">
                        <SkeletonComponent quantity={5} />
                    </Typography>
                ) : (
                    report_ValuedPhys.data
                        .filter((item: any) => (selectedGroup === '' || item.codigo_grupo === selectedGroup))
                        .map((item: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <TableContainer>
                                        <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                                            <strong>Grupo:</strong> {item.grupo}
                                        </Typography>
                                        <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                                            <strong>Código:</strong> {item.codigo_grupo}
                                        </Typography>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledHeaderCell rowSpan={2}>CÓDIGO</StyledHeaderCell>
                                                    <StyledHeaderCell rowSpan={2}>DESCRIPCIÓN</StyledHeaderCell>
                                                    <StyledHeaderCell rowSpan={2}>UNIDAD</StyledHeaderCell>
                                                    <StyledHeaderCell colSpan={3}>ENTRADAS</StyledHeaderCell>
                                                    <StyledHeaderCell colSpan={3}>SALIDAS</StyledHeaderCell>
                                                    <StyledHeaderCell colSpan={3}>SALDO</StyledHeaderCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                                                    <StyledHeaderCell>PRECIO</StyledHeaderCell>
                                                    <StyledHeaderCell>TOTAL</StyledHeaderCell>
                                                    <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                                                    <StyledHeaderCell>PRECIO</StyledHeaderCell>
                                                    <StyledHeaderCell>TOTAL</StyledHeaderCell>
                                                    <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                                                    <StyledHeaderCell>PRECIO</StyledHeaderCell>
                                                    <StyledHeaderCell>TOTAL</StyledHeaderCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.materiales.map((material: any, index: number) => (
                                                    material.lotes.map((lote: any, loteIndex: number) => (
                                                        <StyledTableRow key={`${index}-${loteIndex}`}>
                                                            {loteIndex === 0 && (
                                                                <>
                                                                    <StyledBodyCell rowSpan={material.lotes.length} align='left'>{material.codigo_material}</StyledBodyCell>
                                                                    <StyledDescriptionCell rowSpan={material.lotes.length} align='left'>{material.nombre_material}</StyledDescriptionCell>
                                                                    <StyledBodyCell rowSpan={material.lotes.length}>{material.unidad_material}</StyledBodyCell>
                                                                </>
                                                            )}
                                                            <StyledBodyCell align='center'>{lote.cantidad_inicial}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{lote.precio_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{(lote.cantidad_inicial * lote.precio_unitario).toFixed(2)}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{lote.cantidad_inicial - lote.cantidad_restante}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{lote.precio_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{((lote.cantidad_inicial - lote.cantidad_restante) * lote.precio_unitario).toFixed(2)}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{lote.cantidad_restante}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{lote.precio_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{(lote.cantidad_restante * lote.precio_unitario).toFixed(2)}</StyledBodyCell>
                                                        </StyledTableRow>
                                                    ))
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Divider sx={{ mt: 2 }} />
                                    </TableContainer>
                                </React.Fragment>
                            );
                        })
                )}
            </StyledContainer>

            <Dialog open={openDialog} onClose={cancelUpdate}>
                <DialogTitle>Confirmar Actualización</DialogTitle>
                <DialogContent>
                    <Typography>¿Está seguro de que desea actualizar el reporte?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelUpdate} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmUpdate} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

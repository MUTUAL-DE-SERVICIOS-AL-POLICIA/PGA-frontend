import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider, Grid, Tooltip, IconButton, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useReportKardexStore } from '../../../hooks';
import React, { useEffect, useState } from 'react';
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
});

const StyledBodyCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '100px',
    fontSize: '0.7rem',
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

    useEffect(() => {
        getReportValued(startDate, endDate);
    }, [startDate, endDate]);

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
        PrintReportValued(startDate, endDate);
    };

    const handleDownLoadClick = () => {
        DownloadReportValued(startDate, endDate);
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
                            <Tooltip title="Imprimir">
                                <IconButton
                                    color="primary"
                                    onClick={handlePrintClick}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Descargar">
                                <IconButton
                                    color="primary"
                                    onClick={handleDownLoadClick}
                                >
                                    <DownloadIcon />
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

                {report_ValuedPhys.data == null ? (
                    <Typography variant="body2" align="center">
                        <SkeletonComponent quantity={5} />
                    </Typography>
                ) : (
                    report_ValuedPhys.data
                        .filter((item: any) => selectedGroup === '' || item.codigo_grupo === selectedGroup)
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
                                                    <StyledHeaderCell colSpan={3}>CANTIDADES</StyledHeaderCell>
                                                    <StyledHeaderCell colSpan={3}>SALDOS</StyledHeaderCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledHeaderCell>EXIS. ALM.</StyledHeaderCell>
                                                    <StyledHeaderCell>COS. UNI.</StyledHeaderCell>
                                                    <StyledHeaderCell>COS. TOTAL</StyledHeaderCell>
                                                    <StyledHeaderCell>SAL. EXIS. ALM</StyledHeaderCell>
                                                    <StyledHeaderCell>COS. UNI.</StyledHeaderCell>
                                                    <StyledHeaderCell>COS. TOTAL</StyledHeaderCell>
                                                    <StyledHeaderCell>SAL. EXIS. ALM</StyledHeaderCell>
                                                    <StyledHeaderCell>COS. UNI.</StyledHeaderCell>
                                                    <StyledHeaderCell>SALDO</StyledHeaderCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.materiales.map((material: any, index: number) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledBodyCell align='left'>{material.codigo_material}</StyledBodyCell>
                                                            <StyledDescriptionCell align='left'>{material.nombre_material}</StyledDescriptionCell>
                                                            <StyledBodyCell>{material.unidad_material}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{material.total_ingresado}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.promedio_costo_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{((material.total_ingresado * material.promedio_costo_unitario).toFixed(2))}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{material.total_entregado}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.promedio_costo_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{(material.total_entregado * material.promedio_costo_unitario).toFixed(2)}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{material.total_ingresado - material.total_entregado}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.promedio_costo_unitario}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{((material.total_ingresado - material.total_entregado) * material.promedio_costo_unitario).toFixed(2)}</StyledBodyCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                        <Divider sx={{ mt: 2 }} />
                                    </TableContainer>
                                </React.Fragment>
                            );
                        })
                )}
            </StyledContainer>
        </>
    );
};

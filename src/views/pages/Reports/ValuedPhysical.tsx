import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider, Grid, Tooltip, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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

    const [endDate, setEndDate] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    console.log(setEndDate);
    useEffect(() => {
        getReportValued();
    }, []);

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
        PrintReportValued();
    };

    const handleDownLoadClick = () => {
        DownloadReportValued();
    };

    const handleGroupChange = (event: any) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <>
            <Stack direction="row" marginTop={3} spacing={2} sx={{ mb: 2 }}>
                <FormControl sx={{ minWidth: 500 }}>
                    <InputLabel>Seleccionar Grupo</InputLabel>
                    <Select
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        label="Seleccionar Grupo"
                    >
                        <MenuItem value="">Todos los Grupos</MenuItem>
                        {report_ValuedPhys.data?.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.group_code}>
                                {item.group_name}
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
                    LA PAZ DEL {report_ValuedPhys.date_note?.toUpperCase()} AL {getFormattedEndDate()}
                </Typography>
                <Typography align="center" gutterBottom>
                    (EXPRESADO EN BOLIVIANOS)
                </Typography>

                {report_ValuedPhys.data == null ? (
                    <SkeletonComponent quantity={5} />
                ) : (
                    report_ValuedPhys.data
                        .filter((item: any) => selectedGroup === '' || item.group_code === selectedGroup) // Filtrar por grupo
                        .map((item: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <TableContainer>
                                        <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                                            <strong>Grupo:</strong> {item.group_name}
                                        </Typography>
                                        <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                                            <strong>Código:</strong> {item.group_code}
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
                                                {item.materials.map((material: any, index: number) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledBodyCell align='left'>{material.material_code}</StyledBodyCell>
                                                            <StyledDescriptionCell align='left'>{material.description}</StyledDescriptionCell>
                                                            <StyledBodyCell>{material.unit}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{material.total_amount_entries.toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.average_cost_unit.toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{((material.total_amount_entries * material.average_cost_unit).toFixed(2))}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{(material.total_amount_entries - material.stock).toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.average_cost_unit.toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{((material.total_amount_entries - material.stock) * material.average_cost_unit).toFixed(2)}</StyledBodyCell>

                                                            <StyledBodyCell align='center'>{material.stock.toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{material.average_cost_unit.toFixed(2)}</StyledBodyCell>
                                                            <StyledBodyCell align='right'>{(material.average_cost_unit * material.stock).toFixed(2)}</StyledBodyCell>
                                                        </StyledTableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Divider />
                                </React.Fragment>
                            );
                        })
                )}
            </StyledContainer>
        </>
    );
};

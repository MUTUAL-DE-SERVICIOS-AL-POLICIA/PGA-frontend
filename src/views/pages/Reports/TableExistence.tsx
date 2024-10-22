import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TableProps {
    itemKardex: any;
    date_report: any;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: theme.spacing(0.2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    height: '24px',
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(4, 0),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
}));

const formatNumber = (num: number | undefined) => {
    return typeof num === 'number' ? num.toFixed(2) : '-';
};

export const TableExistence = (props: TableProps) => {
    const { itemKardex } = props;

    if (!itemKardex || !itemKardex.kardex_de_existencia) {
        return (
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    Seleccione un Material
                </Typography>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Typography variant="h6" align="center" gutterBottom>
                KARDEX DE EXISTENCIAS
            </Typography>
            <Typography align="center" gutterBottom>
                (EXPRESADO EN BOLIVIANOS)
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>Código: </strong> {itemKardex.code_material}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>Unidad de medida: </strong> {itemKardex.unit_material}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>Descripción: </strong> {itemKardex.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>Grupo contable: </strong> {itemKardex.group}
                    </Typography>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell rowSpan={2}>FECHA</StyledTableCell>
                            <StyledTableCell rowSpan={2}>DETALLE</StyledTableCell>
                            <StyledTableCell colSpan={3}>CANTIDAD</StyledTableCell>
                            <StyledTableCell rowSpan={2}>PRECIO UNITARIO</StyledTableCell>
                            <StyledTableCell colSpan={3}>IMPORTES</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>ENTRADA</StyledTableCell>
                            <StyledTableCell>SALIDA</StyledTableCell>
                            <StyledTableCell>SALDO</StyledTableCell>
                            <StyledTableCell>ENTRADA</StyledTableCell>
                            <StyledTableCell>SALIDA</StyledTableCell>
                            <StyledTableCell>SALDO</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemKardex.kardex_de_existencia.map((entry: any, index: number) => (
                            <StyledTableRow key={index}>
                                <TableCell align="left">{entry.date}</TableCell>
                                <TableCell align="left">{entry.description}</TableCell>
                                <TableCell align="center">{entry.entradas}</TableCell>
                                <TableCell align="center">{entry.salidas}</TableCell>
                                <TableCell align="right">{entry.stock_fisico}</TableCell>
                                <TableCell align="right">{entry.cost_unit}</TableCell>
                                <TableCell align="right">{entry.entradas ? formatNumber(entry.entradas * entry.cost_unit) : '-'}</TableCell>
                                <TableCell align="right">{entry.salidas ? formatNumber(entry.salidas * entry.cost_unit) : '-'}</TableCell>
                                <TableCell align="right">{entry.entradas || entry.salidas ? `${entry.cost_total}` : '-'}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    );
};

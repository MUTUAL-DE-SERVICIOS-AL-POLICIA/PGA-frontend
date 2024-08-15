import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TableProps {
    itemKardex: any;
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
    console.log(num);
    return typeof num === 'number' ? num.toFixed(2) : '-';
};

export const TableExistence = (props: TableProps) => {
    const { itemKardex } = props;

    console.log(itemKardex);
    // Verifica si itemKardex y kardex_de_existencia están definidos
    if (!itemKardex || !itemKardex.kardex_de_existencia) {
        return (
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    No hay datos disponibles
                </Typography>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Typography variant="h6" align="center" gutterBottom>
                KARDEX DE EXISTENCIAS
            </Typography>
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
                                <TableCell align="center">{entry.date}</TableCell>
                                <TableCell align="center">{entry.description}</TableCell>
                                <TableCell align="center">{entry.entradas}</TableCell>
                                <TableCell align="center">{entry.salidas}</TableCell>
                                <TableCell align="center">{entry.stock_fisico}</TableCell>
                                <TableCell align="center">{entry.cost_unit}</TableCell>
                                <TableCell align="center">{entry.entradas ? '$' + formatNumber(entry.entradas * entry.cost_unit) : '-'}</TableCell>
                                <TableCell align="center">{entry.salidas ? '$' + formatNumber(entry.salidas * entry.cost_unit) : '-'}</TableCell>
                                <TableCell align="center">{entry.entradas || entry.salidas ? `$${entry.cost_total}` : '-'}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    );
};

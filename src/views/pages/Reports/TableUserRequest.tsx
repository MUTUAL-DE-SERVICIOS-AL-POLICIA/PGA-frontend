import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
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



export const TableUserRequest = (props: TableProps) => {
    const { itemKardex } = props;

    if (!itemKardex || itemKardex.length === 0) {
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
            <Typography variant='h6' align='center' gutterBottom>
                Detalle de Materiales Solicitados
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>FUNCIONARIO: </strong> {itemKardex[0]?.employee?.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>CARGO: </strong> {itemKardex[0]?.employee?.name}
                    </Typography>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre del Material</StyledTableCell>
                            <StyledTableCell>Cantidad Solicitada</StyledTableCell>
                            <StyledTableCell>Cantidad Entregada</StyledTableCell>
                            <StyledTableCell>Unidad</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemKardex[0].materials.map((material: any) => (
                            <StyledTableRow key={material.material_id}>
                                <TableCell>{material.name_material}</TableCell>
                                <TableCell>{material.amount_requested}</TableCell>
                                <TableCell>{material.delivered_quantity}</TableCell>
                                <TableCell>{material.unit_material}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    );
};

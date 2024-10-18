import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TableProps {
    itemDirectory: any;
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

export const TableDirectoryRequest = (props: TableProps) => {
    const { itemDirectory } = props;

    if (!itemDirectory.materials) {
        return (
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    Seleccione un Directorio
                </Typography>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Typography variant='h6' align='center' gutterBottom>
                Detalle de Materiales Solicitados: {itemDirectory.name}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre Material</StyledTableCell>
                            <StyledTableCell>Total Entregado</StyledTableCell>
                            <StyledTableCell>Unidad de Medida</StyledTableCell>
                            <StyledTableCell>Costo total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemDirectory.materials.map((material: any) => (
                            <StyledTableRow key={material.material_name}>
                                <TableCell>{material.material_name}</TableCell>
                                <TableCell align='center'>{material.total_amount_requested}</TableCell>
                                <TableCell align='center'>{material.unit_material}</TableCell>
                                <TableCell align='center'>{material.cost}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    );
}

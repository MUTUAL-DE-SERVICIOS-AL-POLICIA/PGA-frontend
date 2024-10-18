import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Material {
    material_id: number;
    name_material: string;
    amount_requested: number;
    delivered_quantity: number;
    unit_material: string;
    cost: number;
}

interface Employee {
    id: number;
    name: string;
    position_name: string;
}

interface KardexItem {
    employee: Employee;
    materials: Material[];
}

interface TableProps {
    itemKardex: KardexItem | null;
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

// Helper function to capitalize the first letter of each word
const capitalizeWords = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const TableUserRequest = (props: TableProps) => {
    const { itemKardex } = props;

    if (!itemKardex || !itemKardex.employee || itemKardex.materials.length === 0) {
        return (
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    Seleccione un funcionario
                </Typography>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Typography variant="h6" align="center" gutterBottom>
                Detalle de Materiales Solicitados
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>FUNCIONARIO: </strong> {capitalizeWords(itemKardex.employee.name)}
                    </Typography>
                    <Typography sx={{ padding: '10px' }}>
                        <strong>CARGO: </strong> {capitalizeWords(itemKardex.employee.position_name)}
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
                            <StyledTableCell>Costo Total</StyledTableCell>
                            <StyledTableCell>Unidad</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemKardex.materials.map((material) => (
                            <StyledTableRow key={material.material_id}>
                                <TableCell>{material.name_material}</TableCell>
                                <TableCell align="center">{material.amount_requested}</TableCell>
                                <TableCell align="center">{material.delivered_quantity}</TableCell>
                                <TableCell align="center">{material.unit_material}</TableCell>
                                <TableCell align="center">{(material.delivered_quantity * material.cost)}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    );
};

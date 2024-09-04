import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useReportKardexStore } from "../../../hooks";
import { useEffect } from "react";
import { SkeletonComponent } from "../../../components";

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
export const ValuedPhysicalConsolided = () => {

    const { report_ValuedPhy_Consolids, getReportValuedConsolid } = useReportKardexStore()

    useEffect(() => {
        getReportValuedConsolid();
    }, [])

    console.log(report_ValuedPhy_Consolids);

    return (
        <>
            <StyledContainer>
                <Typography variant="h6" align="center" gutterBottom>
                    INVENTARIO CONSOLIDADO FISICO VALORADO
                </Typography>
                <Typography align="center" gutterBottom>
                    LA PAZ, FECHA AL FECHA DE AÑO PRESENTE
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell rowSpan={2}>GRUPO</StyledTableCell>
                                <StyledTableCell rowSpan={2}>DETALLE</StyledTableCell>
                                <StyledTableCell colSpan={2}>SALDO GESTIÓN ANTERIOR</StyledTableCell>
                                <StyledTableCell colSpan={2}>COMPRAS DE LA GESTIÓN 2024</StyledTableCell>
                                <StyledTableCell colSpan={2}>SALIDAS DE LA GESTION 2024</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                                <StyledTableCell>FISICO</StyledTableCell>
                                <StyledTableCell>VALOR BS.</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                report_ValuedPhy_Consolids == null ? <SkeletonComponent quantity={4} /> : report_ValuedPhy_Consolids.map((group: any, index: number) => (
                                    <StyledTableRow key={index}>
                                        <TableCell align="center">{group.code}</TableCell>
                                        <TableCell align="left">{group.name_group}</TableCell>
                                        <TableCell align="center">{group.previous_total_sum}</TableCell>
                                        <TableCell align="right">{group.previous_total_cost}</TableCell>
                                        <TableCell align="center">{group.latest_total_sum}</TableCell>
                                        <TableCell align="right">{group.latest_total_cost}</TableCell>
                                        <TableCell align="center">{group.latest_request_sum}</TableCell>
                                        <TableCell align="right">{group.latest_request_cost}</TableCell>

                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledContainer>
        </>
    )
}
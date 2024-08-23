import { useEffect } from "react";
import { useDashboardStore } from "../../../hooks";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

export const TableOrder = () => {

    const { table_boards, getTableDashboard } = useDashboardStore();

    useEffect(() => {
        getTableDashboard();
    }, []);

    if (!table_boards) {
        return <div>Cargando...</div>;
    }
    const getTypeAndAmount = (item: any) => {
        if (item.entradas > 0) {
            return {
                type: "Nota de Entrada",
                amount: item.entradas
            };
        }
        if (item.salidas > 0) {
            return {
                type: "Nota de Solicitud",
                amount: item.salidas
            };
        }
        return {
            type: "Desconocido",
            amount: 0
        };
    };

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>FECHA</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>DESCRIPCIÓN</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CANTIDAD</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>TIPO</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>COSTO TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table_boards.map((item: any, index: any) => {
                            const { type, amount } = getTypeAndAmount(item);
                            const totalCost = (amount * parseFloat(item.cost_unit)).toFixed(2);
                            const statusColor = type === "Nota de Entrada" ? "green" : "red";

                            return (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.date}</TableCell>
                                    <TableCell>{item.material}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{amount}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <CircleIcon sx={{ color: statusColor, fontSize: 'small', marginRight: 1 }} />
                                        {type}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{totalCost} Bs</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

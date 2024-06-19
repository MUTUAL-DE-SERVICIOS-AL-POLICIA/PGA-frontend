import { Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { ComponentSearch } from "../../../components";
import { SupplierModel } from "../../../models";
import { useSupplierStore } from "../../../hooks/useSupplierStore";



interface tableProps {
    limitInit?: number;
}

export const SupplierTable = (props: tableProps) => {

    const { limitInit = 10 } = props;

    const { suppliers, flag, getSuppliers } = useSupplierStore();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    useEffect(() => {
        getSuppliers(page, limit).then((total) => setTotal(total))
    }, [page, limit, flag]);

    return (
        <>
            <ComponentSearch
                title="Buscar Proveedor"
                onSearch={() => { }}
            />
            <Stack sx={{ paddingRight: '10' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} size="medium">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Proveedor</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>NIT</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Telefono / Celular</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Direccion</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    );
}
import { Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { ComponentSearch, SkeletonComponent, } from "../../../components";
import { SupplierModel } from "../../../models";
import { useSupplierStore } from "../../../hooks/useSupplierStore";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


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
                                <TableCell sx={{ fontWeight: 'bold' }}>Representante</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>NIT</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Telefono / Celular</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Direccion</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers == null ? <SkeletonComponent quantity={5} /> : suppliers.map((supplier: SupplierModel) => {
                                return (
                                    <TableRow key={supplier.id} sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell>{supplier.name}</TableCell>
                                        <TableCell>{supplier.sales_representative}</TableCell>
                                        <TableCell>{supplier.nit}</TableCell>
                                        <TableCell>{supplier.cellphone}</TableCell>
                                        <TableCell>{supplier.address}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" startIcon={<SendIcon />}>
                                                Editar
                                            </Button>
                                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    );
}
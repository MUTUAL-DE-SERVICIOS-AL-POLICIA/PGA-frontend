import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ComponentSearch, SkeletonComponent, ComponentTablePagination } from "../../../components";
import { SupplierModel } from "../../../models";
import { useSupplierStore } from "../../../hooks/useSupplierStore";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

interface TableProps {
    limitInit?: number;
    stateSelect?: boolean;
    itemEdit?: (supplier: SupplierModel) => void;
}

export const SupplierTable = (props: TableProps) => {

    const { suppliers, flag, getSuppliers, deleteSupplier } = useSupplierStore();
    const { limitInit = 10, itemEdit } = props;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);

    useEffect(() => {
        getSuppliers(page, limit, '').then((total) => setTotal(total));
    }, [page, limit, flag]);

    const handleSearch = async (search: string) => {
        await setPage(0);
        await setLimit(limitInit);
        getSuppliers(0, limitInit, search).then((total) => setTotal(total));
    }

    return (
        <Stack sx={{ paddingRight: '10' }}>
            <ComponentSearch
                title="Buscar Proveedor"
                onSearch={handleSearch}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
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
                        {suppliers == null ? <SkeletonComponent quantity={5} /> : suppliers.map((supplier: SupplierModel, index: number) => {
                            return (
                                <React.Fragment key={index} >
                                    <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                                        <TableCell>{supplier.name}</TableCell>
                                        <TableCell>{supplier.sales_representative}</TableCell>
                                        <TableCell>{supplier.nit}</TableCell>
                                        <TableCell>{supplier.cellphone}</TableCell>
                                        <TableCell>{supplier.address}</TableCell>
                                        <TableCell>
                                            <Stack alignContent="center" direction="row" >
                                                <IconButton sx={{ p: 0 }} onClick={() => itemEdit!(supplier)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton sx={{ p: 0 }} onClick={() => deleteSupplier(supplier)} >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={total}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setLimit(value)}
                page={page}
                limit={limit}
            />
        </Stack>
    );
}

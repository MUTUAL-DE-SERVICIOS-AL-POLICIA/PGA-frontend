import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ComponentSearch, ComponentTablePagination, SkeletonComponent } from "../../../components"
import { useMaterialStore } from "../../../hooks";
import React, { useEffect, useState } from "react";
import { MaterialModel } from "../../../models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

interface tableProps {
    limitInit?: number;
    items?: any[];
}

export const MaterialTable = (props: tableProps) => {

    const { limitInit = 10, items } = props;

    const { materials, flag, getMaterial } = useMaterialStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);

    useEffect(() => {
        getMaterial(page, limit, '').then((total) => setTotal(total))
    }, [page, limit, flag])

    const handleSearch = async (search: string) => {
        await setPage(0);
        await setLimit(limitInit);
        getMaterial(0, limit, search).then((total) => setTotal(total));
    }


    return (
        <Stack sx={{ paddingRight: '10px' }}>

            <ComponentSearch
                title="Buscar Material"
                onSearch={handleSearch}
            />
            <Typography>Lista de Materiales Y Stock</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID Material</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            materials == null ? <SkeletonComponent quantity={4} /> : materials.map((material: MaterialModel, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                                            <TableCell>{material.id}</TableCell>
                                            <TableCell>{material.description}</TableCell>
                                            <TableCell>{material.stock}</TableCell>
                                            <TableCell>
                                                <IconButton sx={{ p: 0 }}>
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton sx={{ p: 0 }}>
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                )
                            })
                        }
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
    )
}
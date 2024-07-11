import { Button, Chip, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ComponentSearch, ComponentTablePagination, SkeletonComponent } from "../../../components"
import { useMaterialStore } from "../../../hooks";
import React, { useEffect, useState } from "react";
import { MaterialModel } from "../../../models";
import { DeleteOutline, CalendarMonth } from "@mui/icons-material";

interface tableProps {
    limitInit?: number;
    items?: any[];
}

export const MaterialTable = (props: tableProps) => {

    const { limitInit = 10, items } = props;

    const { materials, flag, getMaterial, putState, deleteMaterial } = useMaterialStore();

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
            <Typography>Lista de Materiales y Stock en Almacenes</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Code Material</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Unidad</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Material</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            materials == null ? <SkeletonComponent quantity={4} /> : materials.map((material: MaterialModel, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                                            <TableCell>{material.code_material}</TableCell>
                                            <TableCell>{material.description}</TableCell>
                                            <TableCell>{material.unit_material}</TableCell>
                                            <TableCell>{material.stock}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color={material.state === 'Habilitado' ? 'success' : 'error'}
                                                    onClick={() => putState(material.id, material.state)}
                                                >
                                                    {material.state === 'Habilitado' ? 'Habilitado' : 'Inhabilitado'}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{material.type}</TableCell>
                                            <TableCell>
                                                <IconButton sx={{ p: 2 }} onClick={() => deleteMaterial(material)}>
                                                    <CalendarMonth color="success" />
                                                </IconButton>
                                                <IconButton sx={{ p: 2 }} onClick={() => deleteMaterial(material)}>
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
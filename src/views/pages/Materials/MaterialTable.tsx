import { Button, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Box } from "@mui/material";
import { ComponentSearch, ComponentTablePagination, SkeletonComponent } from "../../../components";
import { useMaterialStore } from "../../../hooks";
import React, { useEffect, useState } from "react";
import { MaterialModel } from "../../../models";
import { DeleteOutline, CalendarMonth, Edit } from "@mui/icons-material";

interface tableProps {
    limitInit?: number;
    items?: any[];
    itemView?: (note_entry: MaterialModel) => void;
    itemEdit?: (note_entry: MaterialModel) => void;
}

export const MaterialTable = (props: tableProps) => {

    const { limitInit = 10, itemView, itemEdit } = props;

    const { materials, flag, getMaterial, putState, deleteMaterial } = useMaterialStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);
    const [stateFilter, setStateFilter] = useState("");

    useEffect(() => {
        getMaterial(page, limit, '', stateFilter).then((total) => setTotal(total));
    }, [page, limit, flag, stateFilter]);

    const handleSearch = async (search: string) => {
        await setPage(0);
        await setLimit(limitInit);
        getMaterial(0, limit, search, stateFilter).then((total) => setTotal(total));
    }

    
    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <ComponentSearch title="Buscar Material" onSearch={handleSearch} />
                <Select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Habilitado">Habilitado</MenuItem>
                    <MenuItem value="Inhabilitado">Inhabilitado</MenuItem>
                </Select>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cod. Material</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Unidad</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tipo de Material</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            materials == null ? <SkeletonComponent quantity={4} /> : materials.map((material: MaterialModel, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                                            <TableCell align="center">{material.code_material}</TableCell>
                                            <TableCell align="left">{material.description}</TableCell>
                                            <TableCell align="center">{material.unit_material}</TableCell>
                                            <TableCell align="center">{material.stock}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color={material.state === 'Habilitado' ? 'success' : 'error'}
                                                    onClick={() => putState(material.id, material.state)}
                                                    disabled={material.type !== 'Almacen'} 
                                                >
                                                    {material.state === 'Habilitado' ? 'Habilitado' : 'Inhabilitado'}
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">{material.type}</TableCell>
                                            <TableCell>
                                                <IconButton sx={{ p: 2 }} onClick={() => itemView!(material)}>
                                                    <CalendarMonth color="success" />
                                                </IconButton>
                                                <IconButton sx={{ p: 2 }} onClick={() => itemEdit!(material)}>
                                                    <Edit color="info" />
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

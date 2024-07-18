import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGroupStore } from "../../../hooks";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Divider
} from '@mui/material';

export const GroupTableSec = () => {
    const location = useLocation();
    const { id_classifier } = location.state || {};
    const { selectgroups, getUnitGroup } = useGroupStore();

    useEffect(() => {
        getUnitGroup(id_classifier);
    }, [id_classifier, getUnitGroup]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="div" gutterBottom>
                Grupos y Materiales
            </Typography>
            {selectgroups && selectgroups.map((group: any) => (
                <Box key={group.id} sx={{ marginBottom: 3 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {group.name_group} (Codigo: {group.code})
                    </Typography>
                    <Divider sx={{ marginBottom: 2, borderWidth: '2px' }} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="materials table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Min</TableCell>
                                    <TableCell>Barcode</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {group.materials.map((material: any) => (
                                    <TableRow key={material.id}>
                                        <TableCell>{material.code_material}</TableCell>
                                        <TableCell>{material.description}</TableCell>
                                        <TableCell>{material.unit_material}</TableCell>
                                        <TableCell>{material.state}</TableCell>
                                        <TableCell>{material.stock}</TableCell>
                                        <TableCell>{material.min}</TableCell>
                                        <TableCell>{material.barcode}</TableCell>
                                        <TableCell>{material.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Box>
    );
};

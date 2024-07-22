import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGroupStore } from "../../../hooks";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const GroupTableSec = () => {
    const location = useLocation();
    const { id_classifier } = location.state || {};
    const { selectgroups, getUnitGroup } = useGroupStore();
    const [expandedGroups, setExpandedGroups] = useState<{ [key: number]: boolean }>({}); // Store expanded state for each group

    useEffect(() => {
        getUnitGroup(id_classifier);
    }, [id_classifier, getUnitGroup]);

    // Function to calculate total stock
    const calculateTotalStock = (materials: any) => {
        return materials.reduce((total: any, material: any) => total + material.stock, 0);
    };

    // Toggle expanded state for a specific group
    const handleToggleExpand = (groupId: number) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Grupos y Materiales
            </Typography>
            {selectgroups && selectgroups.map((group: any) => {
                const totalStock = calculateTotalStock(group.materials);
                const isExpanded = expandedGroups[group.id] !== false; // Default to expanded if not explicitly collapsed

                return (
                    <Box key={group.id} sx={{ marginBottom: 3, position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                            <Typography variant="h5" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {group.name_group} (Codigo: {group.code})
                            </Typography>
                            <IconButton
                                onClick={() => handleToggleExpand(group.id)}
                                aria-label={isExpanded ? 'Collapse Table' : 'Expand Table'}
                                sx={{ color: 'primary.main' }}
                            >
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Box>
                        {group.materials.length === 0 ? (
                            <Typography variant="body2" color="error">
                                No tiene materiales
                            </Typography>
                        ) : (
                            <>
                                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="materials table" size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Codigo</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Descripcion</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Unidad</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                        Total: {totalStock}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Codigo de Barra</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                                <TableCell sx={{ width: 50 }} />
                                            </TableRow>
                                        </TableHead>
                                        {isExpanded && (
                                            <TableBody>
                                                {group.materials.map((material: any) => (
                                                    <TableRow key={material.id}>
                                                        <TableCell>{material.code_material}</TableCell>
                                                        <TableCell>{material.description}</TableCell>
                                                        <TableCell>{material.unit_material}</TableCell>
                                                        <TableCell>{material.state}</TableCell>
                                                        <TableCell>{material.stock}</TableCell>
                                                        <TableCell>{material.barcode}</TableCell>
                                                        <TableCell>{material.type}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

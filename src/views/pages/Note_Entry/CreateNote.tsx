import React, { useCallback, useEffect, useState } from "react";
import { Grid, Grow, IconButton, Paper, TextField, Typography, Box, Divider, Button } from "@mui/material";
import { Delete, ExpandLess, ExpandMore, Save } from "@mui/icons-material";
import { ComponentButton, SelectComponent } from "../../../components";
import { useMaterialStore, useNoteEntryStore, useSupplierStore, useTypeStore } from "../../../hooks";
import { MaterialModel, SupplierModel, TypeModel } from "../../../models";
import { CreateSupplier } from "../Suppliers";
import { CreateMaterials } from "../Materials/createMaterial";
import { useNavigate } from "react-router-dom";

export const CreateNote = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { types = [], getTypes } = useTypeStore();
    const { suppliers = [], getSuppliersList } = useSupplierStore();
    const { materials = [], getMaterial } = useMaterialStore();
    const [typeSelect, setTypeSelect] = useState<number>(0);
    const [supplierSelect, setSupplierSelect] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogMaterial, setOpenDialogMaterial] = useState(false);
    const [selectedMaterials, setSelectedMaterials] = useState<{ id: number, name: string, quantity: number, price: number, unit_material: string }[]>([]);
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [authorizationNumber, setAuthorizationNumber] = useState<string>('');
    const { postNoteEntry, PrintNoteEntry } = useNoteEntryStore();
    console.log(formSubmitted);

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/entryView');
    }

    const handleType = (value: any) => {
        setTypeSelect(value);
    }

    const handleSupplier = (value: any) => {
        setSupplierSelect(value);
    }

    const handleDialog = useCallback((value: boolean) => {
        setOpenDialog(value);
    }, []);

    const handleDialogMaterial = useCallback((value: boolean) => {
        setOpenDialogMaterial(value);
    }, []);

    const handleAddMaterial = (value: any) => {
        const material = materials.find((material: MaterialModel) => material.id === value);
        if (material) {
            setSelectedMaterials([...selectedMaterials, { id: material.id, name: material.description, quantity: 1, price: 0, unit_material: material.unit_material }]);
        }
    }

    const handleQuantityChange = (id: number, quantity: number) => {
        setSelectedMaterials(selectedMaterials.map(material => material.id === id ? { ...material, quantity } : material));
    }

    const handlePriceChange = (id: number, price: number) => {
        setSelectedMaterials(selectedMaterials.map(material => material.id === id ? { ...material, price } : material));
    }

    const handleRemoveMaterial = (id: number) => {
        setSelectedMaterials(selectedMaterials.filter(material => material.id !== id));
    }

    const handleRemoveAllMaterials = () => {
        setSelectedMaterials([]);
    }

    const getTotal = () => {
        return selectedMaterials.reduce((acc, material) => acc + (material.quantity * material.price), 0);
    }

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();

        return `${year}-${month}-${day}`;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            type: typeSelect,
            id_supplier: supplierSelect,
            materials: selectedMaterials,
            date_entry: getCurrentDate(),
            total: getTotal(),
            invoice_number: invoiceNumber,
            authorization_number: authorizationNumber,
            id_user: localStorage.getItem('id')
        };
        setFormSubmitted(true);

        await postNoteEntry(formData).then((res) => {
            if (res) {
                PrintNoteEntry(res);
                handleRedirect();
            }
        });
    }

    useEffect(() => {
        getSuppliersList();
        getTypes();
        getMaterial(0, 5000, '');
    }, []);

    const availableMaterials = materials.filter((material: MaterialModel) => {
        if (typeSelect === 0) return false;
        if (typeSelect === 2) {
            return material.description.includes("(CAJA CHICA)") && !selectedMaterials.some(m => m.id === material.id);
        }
        if (typeSelect === 1) {
            return !material.description.includes("(CAJA CHICA)") && !selectedMaterials.some(m => m.id === material.id);
        }
        return !selectedMaterials.some(m => m.id === material.id);
    });

    const isMaterialSelectDisabled = typeSelect === 0 || supplierSelect === 0;

    const [isMaterialsOpen, setIsMaterialsOpen] = useState(true); // Estado para controlar si la lista de materiales está abierta

    const toggleMaterialsList = () => {
        setIsMaterialsOpen(!isMaterialsOpen);
    }

    return (
        <>
            <Paper sx={{ margin: '10px 0px', padding: '10px', borderRadius: '10px', backgroundColor: '#d3f4eb' }}>
                <Typography variant="h6" style={{ textAlign: 'center', fontSize: '1rem' }}>Nueva Nota de Entrada</Typography>
                <Grow in={true}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={5}>
                                <SelectComponent
                                    handleSelect={handleType}
                                    label={""}
                                    options={[{ id: 0, name: 'Escoger el tipo de ingreso' }, ...types.map((type: TypeModel) => ({ id: type.id, name: type.name_type }))]}
                                    value={typeSelect}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <SelectComponent
                                    handleSelect={handleSupplier}
                                    label={""}
                                    options={[{ id: 0, name: 'Escoger al proveedor' }, ...suppliers.map((supplier: SupplierModel) => ({ id: supplier.id, name: supplier.name }))]}
                                    value={supplierSelect}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <ComponentButton
                                    text="Nuevo Proveedor"
                                    onClick={() => handleDialog(true)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} mt={1}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    fullWidth
                                    label="Número de Factura"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    fullWidth
                                    label="Número de Autorización"
                                    value={authorizationNumber}
                                    onChange={(e) => setAuthorizationNumber(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} mt={1}>
                            <Grid item xs={12} sm={10}>
                                <SelectComponent
                                    handleSelect={handleAddMaterial}
                                    label={""}
                                    options={[...availableMaterials.map((material: MaterialModel) => ({ id: material.id, name: material.description }))]}
                                    value={''}
                                    disabled={isMaterialSelectDisabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <ComponentButton
                                    text="Nuevo Material"
                                    onClick={() => handleDialogMaterial(true)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            startIcon={<Save />}
                            disabled={selectedMaterials.length === 0}
                        >
                            Guardar Nota
                        </Button>
                    </form>
                </Grow>
            </Paper>
            <Paper sx={{ margin: '10px 0px', padding: '10px', borderRadius: '10px', backgroundColor: '#fffbe7' }}>
                <Typography variant="h6" style={{ textAlign: 'center', fontSize: '1rem' }}>Lista de Materiales</Typography>
                <Box sx={{ margin: '5px 0', padding: '5px', borderRadius: '5px', backgroundColor: '#e0e0e0' }}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Material</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Cantidad</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Unidad</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Precio</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Total</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="subtitle1" fontWeight="bold" style={{ fontSize: '0.875rem' }}>Acciones</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <IconButton onClick={toggleMaterialsList} sx={{ marginLeft: 'auto', marginBottom: '10px' }}>
                    {isMaterialsOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                {isMaterialsOpen && selectedMaterials.map(material => (
                    <Box key={material.id} sx={{ margin: '5px 0', padding: '5px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                                <Typography style={{ fontSize: '0.875rem' }}>{material.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    type="number"
                                    label="Cantidad"
                                    value={material.quantity}
                                    onChange={(e) => handleQuantityChange(material.id, parseInt(e.target.value))}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography style={{ fontSize: '0.875rem' }}>{material.unit_material}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    type="number"
                                    label="Precio"
                                    value={material.price}
                                    onChange={(e) => handlePriceChange(material.id, parseFloat(e.target.value))}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography style={{ fontSize: '0.875rem' }}>Total: {(material.quantity * material.price).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={() => handleRemoveMaterial(material.id)}>
                                    <Delete color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Divider sx={{ margin: '10px 0' }} />
                <Grid container justifyContent="space-between">
                    <Typography variant="h6" style={{ fontSize: '1rem' }}>Total General: {getTotal().toFixed(2)}</Typography>
                    <ComponentButton
                        text="Eliminar Todo"
                        color="error"
                        onClick={handleRemoveAllMaterials}
                        startIcon={<Delete />}
                    />
                </Grid>
            </Paper>
            {openDialog && (
                <CreateSupplier
                    open={openDialog}
                    handleClose={() => {
                        handleDialog(false);
                        getSuppliersList();
                    }}
                    supplier={null}
                />
            )}
            {openDialogMaterial && (
                <CreateMaterials
                    open={openDialogMaterial}
                    handleClose={() => {
                        handleDialogMaterial(false);
                        getMaterial(0, 10, '');
                    }}
                    item={null}
                    type_material_select_base="Caja Chica"
                />
            )}
        </>
    );
}

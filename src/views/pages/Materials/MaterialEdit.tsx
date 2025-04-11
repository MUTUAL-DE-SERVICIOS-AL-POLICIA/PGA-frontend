import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { ComponentInput } from "../../../components";
import { useMaterialStore } from "../../../hooks";

interface ViewProps {
    open: boolean;
    handleClose: () => void;
    item: any;
}

export const MaterialEdit = (props: ViewProps) => {
    const { open, handleClose, item } = props;

    const { patchMaterial } = useMaterialStore();

    const [formData, setFormData] = useState({
        code_material: item.code_material,
        description: item.description,
        unit_material: item.unit_material
    });

    useEffect(() => {
        if (item) {
            setFormData({
                code_material: item.code_material,
                description: item.description,
                unit_material: item.unit_material
            });
        }
    }, [item]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await patchMaterial(item.id, formData)
        handleClose();
    };

    const units = [
        "HOJA",
        "ROLLO",
        "BLOCK",
        "CAJA",
        "FRASCO",
        "MTS",
        "PIEZAS",
        "OVILLO",
        "PAR",
        "BIDON",
        "SET",
        "GLOBAL",
        "UNIDAD",
        "LITRO",
        "JUEGO",
        "PAQUETE"
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', boxShadow: 24 } }}
        >
            <DialogTitle>{`Editar Material: ${item.description}`}</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ComponentInput
                                type="text"
                                label="Codigo Material"
                                name="code_material"
                                value={formData.code_material}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ComponentInput
                                type="text"
                                label="Descripción"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Unidad</InputLabel>
                                <Select
                                    label="Unidad"
                                    name="unit_material"
                                    value={formData.unit_material}
                                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                                >
                                    {units.map((unit, index) => (
                                        <MenuItem key={index} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancelar</Button>
                    <Button type="submit" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};


import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useSupplierStore } from "../../../hooks";
import { ComponentInputSelect, ComponentInput } from "../../../components";
import { SupplierModel, FormSupplierModel, formSupplierValidations } from "../../../models";

interface createSupplierProps {
    open: boolean;
    handleClose: () => void;
    supplier: SupplierModel | null;
}

const formFields: FormSupplierModel = {
    name: '',
    nit: '',
    cellphone: '',
    sales_representative: '',
    address: '',
    email: ''
}

export const CreateSupplier = (props: createSupplierProps) => {

    const { open, handleClose, supplier } = props;

    const formValidation: formSupplierValidations = {
        name: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor'],
        nit: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor'],
        cellphone: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor'],
        sales_representative: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor'],
        address: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor'],
        email: [(value: string) => value.length > 1, 'Debes ingresar el nombre del proveedor']
    }

    const { postSupllier } = useSupplierStore();
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modal, setmodal] = useState(false);

    const {
        name, nit, cellphone, sales_representative, address, email,
        onValueChange,
        onInputChange, onFileChange, isFormValid, onResetForm,
        nameValid, addressValid } = useForm(supplier ?? formFields, formValidation);

    const sendSubmit = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if(!isFormValid) return;
        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('nit', nit);
        bodyFormData.append('cellphone', cellphone);
        bodyFormData.append('sales_representative', sales_representative);
        bodyFormData.append('address', address);
        bodyFormData.append('email', email);
        setLoading(true);
        
        if(supplier == null){
            await postSupllier(bodyFormData).then((res)=>{
                if(res){
                    handleClose();
                    onResetForm();
                }
            })
        }
    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{supplier == null ? 'Nuevo Proveedor' : `${supplier.name}`}</DialogTitle>
            <form onSubmit={sendSubmit}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Representante"
                                    name="sales_representative"
                                    value={sales_representative}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Direccion"
                                    name="address"
                                    value={address}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="NIT"
                                    name="nit"
                                    value={nit}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Celular / Telefono"
                                    name="cellphone"
                                    value={cellphone}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(V: any) => onInputChange(V, true)}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {
                        loading ?
                        <CircularProgress color="success" size={30}/> :
                        <>
                            <Button onClick={handleClose}>CANCELAR</Button>
                            <Button>
                                {supplier == null ? 'CREAR' : 'GUARDAR'}
                            </Button>
                        </>
                    }
                </DialogActions>
            </form>
        </Dialog>
    );
}
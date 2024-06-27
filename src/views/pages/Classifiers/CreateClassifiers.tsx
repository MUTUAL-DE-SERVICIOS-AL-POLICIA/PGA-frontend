import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { ClassifierModel, FormClassifierModel, FormClassifierValidations } from "../../../models";
import { FormEvent, useState } from "react";
import { ComponentInput } from "../../../components";
import { useForm, useClassifierStore } from "../../../hooks";


interface CreateClassifierProps {
    open: boolean;
    handleClose: () => void;
    classifier: ClassifierModel | null;
}

const formFields: FormClassifierModel = {
    code_class: '',
    nombre: '',
    description: ''
}

export const CreateClassifier = (props: CreateClassifierProps) => {
    const { open, handleClose, classifier } = props;


    const formValidations: FormClassifierValidations = {
        code_class: [(value: string) => value.length >= 1, 'Debe ingresar el codigo del clasificadores'],
        nombre: [(value: string) => value.length >= 1, 'Debe ingresar el nombre del clasificador'],
        description: [(value: string) => value.length >= 1, 'Debe ingresar el descripción del clasificador']
    }

    const { postCreateClassifier, patchUpdateClassifier } = useClassifierStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    //const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const { code_class, nombre, description, onInputChange, isFormValid, onResetForm, code_classValid, nombreValid, descriptionValid } = useForm(classifier ?? formFields, formValidations);

    const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        let data = { code_class, nombre, description };
        setLoading(true);
        if (classifier == null) {
            await postCreateClassifier(data).then((res) => {
                if (res) {
                    handleClose();
                    onResetForm();
                }
            });
        }else{
            await patchUpdateClassifier(classifier.id,data).then((res)=>{
                if(res){
                    handleClose();
                    onResetForm();
                }
            })
        }
        setLoading(false);

    }

    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{classifier == null ? 'Nuevo Clasificador' : `${classifier.nombre}`}</DialogTitle>
            <form onSubmit={sendSubmit}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={15}>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Codigo del Clasificador"
                                    name="code_class"
                                    value={code_class}
                                    onChange={onInputChange}
                                    error={!!code_classValid && formSubmitted}
                                    helperText={formSubmitted && code_classValid}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Nombre del Clasificador"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onInputChange}
                                    error={!!nombreValid && formSubmitted}
                                    helperText={formSubmitted && nombreValid}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={15}>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Descripcion"
                                    name="description"
                                    value={description}
                                    multiline={true}
                                    width="100%"
                                    height="auto"
                                    onChange={onInputChange}
                                    error={!!descriptionValid && formSubmitted}
                                    helperText={formSubmitted && descriptionValid}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {
                        loading ?
                            <CircularProgress color="success" size={30} /> :
                            <>
                                <Button onClick={handleClose}>CANCELAR</Button>
                                <Button type="submit">
                                    {classifier == null ? 'CREAR' : 'GUARDAR'}
                                </Button>
                            </>
                    }
                </DialogActions>
            </form>
        </Dialog>

    );
}
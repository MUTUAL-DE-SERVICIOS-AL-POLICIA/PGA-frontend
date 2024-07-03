import { useCallback, useEffect, useState } from "react";
import { FormMaterialModel, GroupModel, MaterialModel, FormMaterialValidate } from "../../../../models";
import { useForm } from "../../../../hooks";
import { ComponentInputSelect, ModalSelectComponent } from "../../../../components";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { GroupModal } from "../../Groups";

interface createProps {
    open: boolean;
    handleClose: () => void;
    item: MaterialModel | null;
}

const formMaterialFields: FormMaterialModel = {
    group_id: null,
    code_material: '',
    description: '',
    unit_material: '',
    barcode: '',
}

const formMaterialValidation: FormMaterialValidate = {
    group_id: [(value: GroupModel) => value !== null, 'Debe pertenecer a un Grupo'],
    code_material: [(value: string | null) => value == null, 'Debe ingresar el codigo correspondiente del material'],
    description: [(value: string | null) => value == null, 'Debe ingresar la descripcion del material'],
    unit_material: [(value: string | null) => value == null, 'Debe ingresar la unidad del material'],
    barcode: [(value: string | null) => value == null, 'Debe ingresar la codigo de barra del material']
}

export const CreateMaterials = (props: createProps) => {
    const { open, handleClose, item } = props

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { group_id, code_material, description, unit_material, barcode,
        onInputChange, onValueChange, isFormValidm, onResetForm,
        group_idValid, code_materialValid, descriptionValid, unit_materialValid,
        barcodeValid } = useForm(item ?? formMaterialFields, formMaterialValidation);


    const handleModal = useCallback((value: boolean) => setModal(value), [{}]);

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setScreenHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight]);

    return (
        <>
            {
                modal ?
                    <ModalSelectComponent
                        stateSelect={true}
                        stateMultiple={false}
                        title='Seleccione el grupo del nuevo material'
                        opendrawer={modal}
                        handleDrawer={handleModal}
                    >
                        {/*Colocar la tabla*/}
                        <GroupModal
                            stateSelect={true}
                            limitInit={5}
                            itemSelect={(v)=>{
                                onValueChange('groups', v);
                                handleModal(false)
                            }}
                        />
                    </ModalSelectComponent> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nuevo Material</DialogTitle>
                <form action="">
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInputSelect
                                    label="Grupos"
                                    title="Seleccionar Grupo"
                                    onPressed={() => handleModal(true)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
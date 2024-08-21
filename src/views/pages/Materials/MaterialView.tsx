import { Stack, SvgIcon } from "@mui/material"
import { ComponentButton } from "../../../components"
import { Add } from "@mui/icons-material"
import { MaterialTable } from "./MaterialTable"
import { useCallback, useState } from "react"
import { MaterialModel } from "../../../models"
import { CreateMaterials } from "./createMaterial"
import { MaterialsDetail } from "./MaterialDetail"
import { MaterialEdit } from "./MaterialEdit"

export const MaterialView = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [openDialogView, setOpenDialogView] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [itemEdit2, setItemEdit2] = useState<MaterialModel | null>(null);
    const [itemEdit, setItemEdit] = useState<MaterialModel | null>(null);
    const [itemView, setItemView] = useState<MaterialModel | null>(null);


    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value)
    }, [])


    const handleDialogView = useCallback((value: boolean) => {
        setOpenDialogView(value);
    }, [])

    const handleDialogEdit = useCallback((value: boolean) => {
        setOpenDialogEdit(value);
    }, [])

    return (
        <>
            <Stack
                direction="row"
                justifyContent="end"
            >
                <ComponentButton
                    text="Nuevo Material"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                />
            </Stack>
            <MaterialTable
                itemView={(v) => {
                    setItemView(v)
                    handleDialogView(true)
                }}
                itemEdit={(v) => {
                    setItemEdit2(v)
                    handleDialogEdit(true)
                }}
            />
            {
                openDialog &&
                <CreateMaterials
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                    type_material_select_base="Almacen"
                />
            }
            {
                openDialogView &&
                <MaterialsDetail
                    open={openDialogView}
                    handleClose={() => handleDialogView(false)}
                    item={itemView}
                />
            }
            {
                openDialogEdit &&
                <MaterialEdit
                    open={openDialogEdit}
                    handleClose={() => handleDialogEdit(false)}
                    item={itemEdit2}
                />
            }

        </>
    )
}
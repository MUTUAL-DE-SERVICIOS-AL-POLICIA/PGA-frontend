import { Stack, SvgIcon } from "@mui/material"
import { ComponentButton } from "../../../components"
import { Add } from "@mui/icons-material"
import { MaterialTable } from "./MaterialTable"
import { useCallback, useState } from "react"
import { MaterialModel } from "../../../models"
import { CreateMaterials } from "./createMaterial"
import { MaterialsDetail } from "./MaterialDetail"
import { useMaterialStore } from "../../../hooks"

export const MaterialView = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [openDialogView, setOpenDialogView] = useState(false);
    const [itemEdit, setItemEdit] = useState<MaterialModel | null>(null);
    const { viewMaterial } = useMaterialStore();
    const [itemView, setItemView] = useState<MaterialModel | null>(null);


    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value)
    }, [])


    const handleDialogView = useCallback((value: boolean) => {
        setOpenDialogView(value);
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

        </>
    )
}
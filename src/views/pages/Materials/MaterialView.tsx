import { Stack, SvgIcon } from "@mui/material"
import { ComponentButton } from "../../../components"
import { Add } from "@mui/icons-material"
import { MaterialTable } from "./MaterialTable"
import { useCallback, useState } from "react"
import { MaterialModel } from "../../../models"
import { CreateMaterials } from "./createMaterial"

export const MaterialView = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<MaterialModel | null>(null)

    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value)
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
            <MaterialTable />
            {
                openDialog &&
                <CreateMaterials
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />

            }

        </>
    )
}
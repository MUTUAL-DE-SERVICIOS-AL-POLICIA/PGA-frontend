import { Stack, SvgIcon } from "@mui/material"
import { ComponentButton } from "../../../components"
import { Add } from "@mui/icons-material"
import { UsersTable } from "./UsersTable"
import { useCallback, useState } from "react"
import { CreateNewUsers } from "./CreateNewUsers"

export const UsersView = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialog = useCallback((value: boolean) => {
        setOpenDialog(value);
    }, []);

    return (
        <>
            <Stack direction="row" justifyContent="flex-end">
                <ComponentButton
                    text="Nuevo Usuario"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                />
            </Stack>

            <UsersTable />
            {
                openDialog &&
                <CreateNewUsers />
            }

        </>
    )
}
import { ComponentButton } from "../../../components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { GroupModel } from "../../../models";
import { GroupTablePrincipal } from "./GroupTablePrincipal";


export const GroupView = () => {
    return (
       <>
        <Stack direction="row" justifyContent="end">
            <ComponentButton 
                text="Nuevo Grupo"
                startIcon={<SvgIcon fontSize="small"><Add/></SvgIcon>}
            />
        </Stack>

        <GroupTablePrincipal/>



       </>
    )
}
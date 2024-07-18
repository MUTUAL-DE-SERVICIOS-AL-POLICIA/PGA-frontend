import { ComponentButton } from "../../../components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { GroupModel } from "../../../models";
import { GroupTablePrincipal } from "./GroupTablePrincipal";
import { useLocation } from "react-router-dom";

export const GroupView = () => {
    const location = useLocation();
    const { id_classifier } = location.state || {};

    return (
        <>
            <Stack direction="row" justifyContent="flex-start">
                {/* <ComponentButton 
                text="Nuevo Grupo"
                startIcon={<SvgIcon fontSize="small"><Add/></SvgIcon>}
            /> */}

                <Typography variant="h4" padding={2}>Lista de Grupos</Typography>
            </Stack>

            <GroupTablePrincipal
                id_classifier={id_classifier}
            />
        </>
    )
}
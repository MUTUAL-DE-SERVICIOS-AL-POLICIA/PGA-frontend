import { Stack, Typography } from "@mui/material";
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
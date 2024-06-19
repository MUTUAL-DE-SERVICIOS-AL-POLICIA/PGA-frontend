import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { ComponentButton } from "../../../components";
import { SupplierTable } from "./SupplierTable";

export const SupplierView = () =>{
    const [openDialog, setOpenDialog] = useState(false);
    const handleDialog = useCallback((value: boolean) =>{
        setOpenDialog(value);
    }, []);
    return(
        <>
         <Stack
          direction="row"
          justifyContent="flex-start"
         >
            <h1>Lista de proveedores</h1>
         </Stack>
         <Stack
          direction="row"
          justifyContent="flex-end"
         >
            <ComponentButton
                text="Nuevo Provedor"
                onClick={()=>handleDialog(true)}
                startIcon={<SvgIcon fontSize="small"><Add/></SvgIcon>}
            />
         </Stack>

         <SupplierTable/>
         
        </>
    );
}
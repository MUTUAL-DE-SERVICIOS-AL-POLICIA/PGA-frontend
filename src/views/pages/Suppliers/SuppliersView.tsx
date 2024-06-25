import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { ComponentButton } from "../../../components";
import { SupplierTable } from "./SupplierTable";
import { CreateSupplier } from "./CreateSupplier";
import { SupplierModel } from "../../../models";

export const SupplierView = () =>{
    const [openDialog, setOpenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<SupplierModel | null>(null);


    const handleDialog = useCallback((value: boolean) =>{
        if(!value) setItemEdit(null)
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

         <SupplierTable
            itemEdit={(v)=>{
                setItemEdit(v)
                handleDialog(true)
            }}
         />
         {
            openDialog &&
            <CreateSupplier
                open={openDialog}
                handleClose={()=>handleDialog(false)}
                supplier={itemEdit}
            />
         }
        </>
    );
}
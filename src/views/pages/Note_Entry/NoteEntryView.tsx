import { Stack, SvgIcon } from "@mui/material";
import { ComponentButton } from "../../../components";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TableNotesEntry } from "./TableNotesEntry";
import { useCallback, useState } from "react";
import { ViewNote } from "./ViewNote";
import { NoteEntryModel } from "../../../models";


export const NoteEntryView = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [itemView, setItemView] = useState<NoteEntryModel | null>(null)

    const handleDialog = useCallback((value: boolean) => {
        if(!value) setItemView(null)
        setopenDialog(value);
    }, [])

    const navigate = useNavigate();
    const handleRederict = () => {
        navigate('/createNote');
    }

    return (
        <>
            <Stack direction="row" justifyContent="end">
                <ComponentButton
                    text="Nueva Nota de Entrada"
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                    onClick={handleRederict}
                />
            </Stack>
            <TableNotesEntry 
                itemView={(v) => {
                    setItemView(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <ViewNote
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemView}
                />
            }
        </>
    );
}
import { useState, useCallback } from "react";
import { TableNotesAproved } from "./TableNotesAproved";
import { NoteViewAproveed } from "./NoteViewAproveed";

export const NoteEntryRevised = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [itemView, setItemView] = useState<any | null>(null)

    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemView(null)
        setopenDialog(value);
    }, [])

    return (
        <>
            <TableNotesAproved
                itemView={(v) => {
                    setItemView(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <NoteViewAproveed
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemView}
                />
            }
        </>
    )
}
import { useCallback, useState } from "react"
import { NoteRequestModel } from "../../../models/NoteRequestModel";
import { TableNoteRequestPettyCash } from "./TableNoteRequestPettyCash";
import { ViewNoteRequestPettyCash } from "./ViewNoteRequestPettyCash";

export const NoteRequestPettyCash = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [itemView, setItemView] = useState<NoteRequestModel | null>(null)

    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemView(null)
        setopenDialog(value);
    }, [])

    return (
        <>
            <TableNoteRequestPettyCash
                itemView={(v) => {
                    setItemView(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <ViewNoteRequestPettyCash
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemView}
                />
            }
        </>
    )
}
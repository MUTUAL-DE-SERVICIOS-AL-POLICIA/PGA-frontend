import { Stack, Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ClassifierModel } from "../../../models";
import { ClassifierTable } from "./ClassifierTable";
import { CreateClassifier } from "./CreateClassifiers";


const SIDE_NAV_WIDTH = 100;

export const ClassifierView = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<ClassifierModel | null>(null);

    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null);
        setOpenDialog(value);
    }, [])
    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: {
                        lg: `calc((100%/4 / 25) * 2)`
                    },
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="start"
                    padding={1}
                >
                    {/* <ComponentButton
                        text="Nuevo Clasificador"
                        onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} /> */}
                </Stack>
            </Box>
            <Typography variant="h4">Lista de Clasificadores</Typography>
            <ClassifierTable
                itemEdit={(v) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {openDialog &&
                <CreateClassifier
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    classifier={itemEdit}
                />
            }

        </>
    )
}
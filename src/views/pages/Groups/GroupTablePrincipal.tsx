import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGroupStore } from "../../../hooks"
import React, { useEffect, useState } from "react";
import { ComponentSearch, SkeletonComponent, ComponentTableContent } from "../../../components";
import { GroupModel } from "../../../models";


interface tableProps {
    limitInit?: number;
}

export const GroupTablePrincipal = (props: tableProps) => {
    const {
        limitInit = 10,
    } = props


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);

    const { getGroups } = useGroupStore();
    const [open, setOpen] = useState(false);
    const [groupSelectm, setGroupSelected] = useState(null);

    const handleDialog = (value: boolean, group: any) => {
        setOpen(value);
        setGroupSelected(group);
    }

    useEffect(() => {
        getGroups(page, limit, '').then((total) => setTotal(total))
    }, [page, limit])

    return (
        <>
            <Stack sx={{paddingRight: '10px'}}>

            </Stack>
        </>
    )



}
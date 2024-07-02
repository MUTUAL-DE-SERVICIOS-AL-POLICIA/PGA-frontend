import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGroupStore } from "../../../hooks"
import React, { useEffect, useState } from "react";
import { ComponentSearch, SkeletonComponent, ComponentTableContent, ComponentTablePagination } from "../../../components";
import { GroupModel } from "../../../models";
import { fontWeight } from "@mui/system";


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

    const { allGroups = [], allgroupsWithMaterial = [], getAllGroups } = useGroupStore();
    const [open, setOpen] = useState(false);
    const [groupSelectm, setGroupSelected] = useState(null);

    const handleDialog = (value: boolean, group: any) => {
        setOpen(value);
        setGroupSelected(group);
    }

    useEffect(() => {
        getAllGroups(page, limit, '').then((total) => setTotal(total))
    }, [page, limit])

    return (
        <>
            <Stack sx={{ paddingRight: '10px' }}>

                {
                    allGroups!==0 && allgroupsWithMaterial !==0 && <ComponentTableContent
                        headers={['ID', 'Codigo Clasificador','Codigo Grupo', 'Nombre del Grupo']}
                        data={allGroups}
                        sxHeader={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}
                        useCollapse={true}
                        subTableTitle={"Materiales"}
                        subTableHeaders={['ID', 'Unidad', 'Descripción', 'Stock']}
                        subTableData={allgroupsWithMaterial}
                    />
                }
                <ComponentTablePagination
                    total={total}
                    onPageChange={(value) => setPage(value)}
                    onRowsPerPageChange={(value) => setLimit(value)}
                    page={page}
                    limit={limit}
                />
            </Stack>

        </>
    )



}
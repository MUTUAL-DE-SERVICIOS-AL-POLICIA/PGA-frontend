import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGroupStore } from "../../../hooks"
import React, { useEffect, useState } from "react";
import { ComponentSearch, SkeletonComponent } from "../../../components";
import { GroupModel } from "../../../models";
interface tableProps {
    limitInit?: number;
}

export const GroupTablePrincipal = (props: tableProps) => {
    const {
        limitInit = 10,
    } = props

    const { groups, flag, getGroups } = useGroupStore();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        getGroups(page, limit, '').then((total) => setTotal(total))
    }, [page, limit, flag])

    const handleSearch = async (search: string) => {
        await setPage(0);
        await setLimit(limitInit);
        getGroups(0, limitInit, search).then((total) => setTotal(total));
    }
    return (
        <Stack sx={{ paddingRight: '10' }}>
            <ComponentSearch
                title="Buscar Grupo"
                onSearch={handleSearch}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Codigo del Clasificador</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Codigo del Grupo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Grupo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            groups == null ?
                                <SkeletonComponent quantity={4} /> :
                                groups.map((group: GroupModel, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                                                <TableCell>{group.classifier}</TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}
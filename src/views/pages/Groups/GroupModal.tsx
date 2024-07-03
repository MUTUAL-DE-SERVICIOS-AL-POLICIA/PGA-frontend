import { useEffect, useState } from "react";
import { useGroupStore } from "../../../hooks";
import { GroupModel } from "../../../models";
import { Stack } from "@mui/system";
import { ComponentSearch, SkeletonComponent, ComponentTablePagination } from "../../../components";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


interface tableProps {
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (groupMaterial: GroupModel) => void;
    items?: any[];
}

export const GroupModal = (props: tableProps) => {
    const { stateSelect = false, itemSelect, limitInit = 10, items = [], } = props;
    const { flag, allGroups, getAllGroups } = useGroupStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);

    useEffect(() => {
        getAllGroups(page, limit, '').then((total) => setTotal(total))
    }, [page, limit, flag]);

    const handleSearch = async (search: string) => {
        await setPage(0);
        await setLimit(limitInit);
        getAllGroups(0, limitInit, search).then((total) => setTotal(total))
    }
    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Grupo"
                onSearch={handleSearch}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F6' }}>
                            {stateSelect && <TableCell />}
                            <TableCell sx={{ fontWeight: 'bold' }}>Codigo Grupo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Grupo</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allGroups == null ? <SkeletonComponent quantity={3} /> : allGroups.map((allGroup: GroupModel) => {
                            const isSelected = items.includes(allGroup.id);
                            // const isNameGroup = allGroup.name_group;
                            return (
                                <TableRow key={allGroup.id} sx={{ borderBottom: '2px solid #ccc' }}>
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(allGroup)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{allGroup.code_group}</TableCell>
                                    <TableCell>{allGroup.name_group}</TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={total}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setLimit(value)}
                page={page}
                limit={limit}
            />
        </Stack>
    );
}
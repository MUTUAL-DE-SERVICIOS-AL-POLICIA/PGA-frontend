import { Stack } from "@mui/material"
import { useGroupStore } from "../../../hooks"
import { useEffect, useState } from "react";
import { ComponentTableContent, ComponentTablePagination } from "../../../components";


interface tableProps {
    limitInit?: number;
    id_classifier?: number;
}

export const GroupTablePrincipal = (props: tableProps) => {
    const {
        limitInit = 10,
    } = props

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit);

    const { allGroups = [], allgroupsWithMaterial = [], getAllGroups } = useGroupStore();


    useEffect(() => {
        getAllGroups(page, limit, '').then((total) => setTotal(total))
    }, [page, limit])

    return (
        <>
            <Stack sx={{ paddingRight: '10px' }}>

                {
                    allGroups !== 0 && allgroupsWithMaterial !== 0 && <ComponentTableContent
                        headers={['ID', 'Codigo Clasificador', 'Codigo Grupo', 'Nombre del Grupo']}
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
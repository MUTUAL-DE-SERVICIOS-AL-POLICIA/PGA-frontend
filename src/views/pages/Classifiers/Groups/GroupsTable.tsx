import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { GroupModel } from "../../../../models";
import { SkeletonComponent } from "../../../../components";
import React from "react";

interface tableProps {
    groups: Array<GroupModel>;
}

export const GroupsTable = (props: tableProps) => {
    const { groups } = props;
    //console.log(groups);
    return (
        <Stack sx={{ paddingRight: '10' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Grupos:</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Grupo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {groups == null ? <SkeletonComponent quantity={4}/> : groups.map((group: GroupModel, index:number)=>{
                            return(
                                <React.Fragment key={index}>
                                    <TableRow sx={{borderBottom: '2px solid #ccc'}}>
                                        <TableCell>{group.name_group}</TableCell>
                                        <TableCell>{group.materials_count}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}
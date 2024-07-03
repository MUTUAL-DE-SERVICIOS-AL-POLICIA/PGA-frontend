import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { SkeletonComponent } from "../../../components"

export const MaterialTable = () => {
    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <Typography>Lista de Materiales Y Stock</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ background: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID Material</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <SkeletonComponent quantity={4}/>                        
                    </TableBody>
                </Table>
            </TableContainer>


        </Stack>



    )
}
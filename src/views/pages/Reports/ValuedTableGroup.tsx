import { Table, TableBody, TableContainer, TableHead, TableRow, Typography, Divider } from '@mui/material';
import { StyledHeaderCell, StyledDescriptionCell, StyledBodyCell, StyledFooterCell, StyledTableRow } from './StyledComponents';

export const ValuedTableGroup = ({ item, saldosAnteriores }: { item: any, saldosAnteriores: any }) => {
    const calculateGroupTotal = (materiales: any) => {
        return materiales.reduce((total: number, material: any) => {
            const materialTotal = material.lotes.reduce((loteTotal: number, lote: any) => {
                return loteTotal + (lote.cantidad_restante || 0) * (lote.precio_unitario || 0);
            }, 0);
            return total + materialTotal;
        }, 0);
    };

    const groupTotal = calculateGroupTotal(item.materiales);

    const getPreviousBalance = (codigo_material: string) => {

        console.log(codigo_material);
        // console.log(saldosAnteriores.materiales)
        // if (saldosAnteriores.materiales[codigo_material]) {
        //     const materialSaldo = saldosAnteriores[cod_group].materiales.find(
        //         (saldo: any) => saldo.codigo_material === codigo_material
        //     );
        //     return materialSaldo || null;
        // }
        return null;
    };

    return (
        <TableContainer>
            <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                <strong>Grupo:</strong> {item.grupo}
            </Typography>
            <Typography sx={{ padding: '10px', fontSize: '0.9rem' }}>
                <strong>Código:</strong> {item.codigo_grupo}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledHeaderCell rowSpan={2}>CÓDIGO</StyledHeaderCell>
                        <StyledHeaderCell rowSpan={2}>DESCRIPCIÓN</StyledHeaderCell>
                        <StyledHeaderCell rowSpan={2}>UNIDAD</StyledHeaderCell>
                        <StyledHeaderCell colSpan={3}>SAL. ANT. GES</StyledHeaderCell>
                        <StyledHeaderCell colSpan={3}>ENTRADAS</StyledHeaderCell>
                        <StyledHeaderCell colSpan={3}>SALIDAS</StyledHeaderCell>
                        <StyledHeaderCell colSpan={3}>SALDO</StyledHeaderCell>
                    </TableRow>
                    <TableRow>
                        <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                        <StyledHeaderCell>PRECIO</StyledHeaderCell>
                        <StyledHeaderCell>TOTAL</StyledHeaderCell>
                        <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                        <StyledHeaderCell>PRECIO</StyledHeaderCell>
                        <StyledHeaderCell>TOTAL</StyledHeaderCell>
                        <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                        <StyledHeaderCell>PRECIO</StyledHeaderCell>
                        <StyledHeaderCell>TOTAL</StyledHeaderCell>
                        <StyledHeaderCell>CANTIDAD</StyledHeaderCell>
                        <StyledHeaderCell>PRECIO</StyledHeaderCell>
                        <StyledHeaderCell>TOTAL</StyledHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item.materiales.map((material: any, index: number) =>
                        material.lotes.map((lote: any, loteIndex: number) => {
                            const previousBalance = getPreviousBalance(material.codigo_material);

                            return (
                                <StyledTableRow key={`${index}-${loteIndex}`}>
                                    {loteIndex === 0 && (
                                        <>
                                            <StyledBodyCell rowSpan={material.lotes.length} align="left">
                                                {material.codigo_material}
                                            </StyledBodyCell>
                                            <StyledDescriptionCell rowSpan={material.lotes.length} align="left">
                                                {material.nombre_material}
                                            </StyledDescriptionCell>
                                            <StyledBodyCell rowSpan={material.lotes.length}>
                                                {material.unidad_material}
                                            </StyledBodyCell>
                                        </>
                                    )}

                                    {/* SALDO ANTERIOR GESTIÓN */}
                                    <StyledBodyCell align="center">
                                        {previousBalance ? previousBalance.lotes[0]?.cantidad_restante : 0}
                                    </StyledBodyCell>
                                    <StyledBodyCell align="right">
                                        {previousBalance ? previousBalance.lotes[0]?.precio_unitario.toFixed(2) : 0}
                                    </StyledBodyCell>
                                    <StyledBodyCell align="right">
                                        {previousBalance ? previousBalance.lotes[0]?.valor_restante.toFixed(2) : 0}
                                    </StyledBodyCell>

                                    {/* ENTRADAS */}
                                    <StyledBodyCell align="center">{lote.cantidad_inicial}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.precio_unitario.toFixed(2)}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.cantidad_1.toFixed(2)}</StyledBodyCell>

                                    {/* SALIDAS */}
                                    <StyledBodyCell align="center">{lote.cantidad_inicial - lote.cantidad_restante}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.precio_unitario.toFixed(2)}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.cantidad_2.toFixed(2)}</StyledBodyCell>

                                    {/* SALDO */}
                                    <StyledBodyCell align="center">{lote.cantidad_restante}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.precio_unitario.toFixed(2)}</StyledBodyCell>
                                    <StyledBodyCell align="right">{lote.cantidad_3.toFixed(2)}</StyledBodyCell>
                                </StyledTableRow>
                            );
                        })
                    )}
                    <StyledTableRow>
                        <StyledFooterCell colSpan={13}>TOTAL EN BS</StyledFooterCell>
                        <StyledFooterCell colSpan={2} align="right">
                            {groupTotal.toFixed(2)}
                        </StyledFooterCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
            <Divider sx={{ mt: 2 }} />
        </TableContainer>
    );
};

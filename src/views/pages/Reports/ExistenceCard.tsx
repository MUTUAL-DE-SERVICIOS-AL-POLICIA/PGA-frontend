import { TableExistence } from "./TableExistence";
import { useMaterialStore, useReportKardexStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { SelectComponent } from "../../../components";
import { MaterialModel } from "../../../models";

export const ExistenceCard = () => {

    const { materials = [], getMaterial } = useMaterialStore();
    const { report_kardexs, getReportKardex } = useReportKardexStore();

    const [selectedMaterials] = useState<{ id: number, name: string, quantity: number, price: number, unit_material: string }[]>([]);

    const handleAddMaterial = (value: any) => {
        const material = materials.find((material: MaterialModel) => material.id === value);
        if (material) {
            getReportKardex(material.id);
            // console.log(report_kardexs);
        }
    }
    useEffect(() => {
        getMaterial(0, 5000, '');
    }, []);

    const availableMaterials = materials.filter((material: MaterialModel) => !selectedMaterials.some(selected => selected.id === material.id));


    return (
        <>
            <Grid container spacing={1} mt={1}>
                <Grid item xs={10} sm={10}>
                    <SelectComponent
                        handleSelect={handleAddMaterial}
                        label={""}
                        options={[...availableMaterials.map((material: MaterialModel) => ({ id: material.id, name: material.description }))]}
                        value={''}
                    />
                </Grid>
            </Grid>
            <TableExistence
                itemKardex={report_kardexs}
            />
        </>
    );
}
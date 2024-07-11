import { GroupModel } from "."

export interface MaterialModel {
    id: number;
    group_id: GroupModel;
    code_material: string;
    description: string;
    unit_material: string;
    state: string;
    min: string;
    barcode: string;
    type: string;
    stock: number;
}

export interface FormMaterialModel {
    group_id: GroupModel | null;
    code_material: string | null;
    description: string | null;
    unit_material: string | null;
    barcode: string | null;
}

export interface FormMaterialValidate {
    group_id: [(value: GroupModel) => boolean, string];
    code_material: [(value: string | null) => boolean, string]
    description: [(value: string | null) => boolean, string]
    unit_material: [(value: string | null) => boolean, string]
    barcode: [(value: string | null) => boolean, string];
}
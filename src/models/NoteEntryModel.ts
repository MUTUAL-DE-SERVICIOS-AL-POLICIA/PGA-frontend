import { MaterialModel } from "./MaterialModel";
import { SupplierModel } from "./SupplierModel";

export interface NoteEntryModel {
    id: number;
    number_note: number;
    invoice_number: string;
    delivery_date: string;
    state: string;
    invoice_auth: string;
    user_register: string;
    observation: string;
    type_id: number;
    supplier_id: SupplierModel
    materials: MaterialModel[];
}
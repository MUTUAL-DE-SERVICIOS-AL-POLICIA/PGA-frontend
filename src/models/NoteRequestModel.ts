import { MaterialModel } from "./MaterialModel";

export interface NoteRequestModel {
    id: number;
    number_note: number;
    state: string;
    observation:string;
    user_register: number;
    request_date: string;
    employee: string;
    materials: MaterialModel[];
}
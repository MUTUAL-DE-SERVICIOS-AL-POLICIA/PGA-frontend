export interface SupplierModel{
    id:number,
    name:string,
    nit:string,
    cellphone:string,
    sales_representative:string,
    address:string,
    email:string
}
export interface FormSupplierModel {
    name:string | null,
    nit:string | null,
    cellphone:string | null,
    sales_representative:string | null,
    address:string | null,
    email:string | null
}
export interface formSupplierValidations {
    name: [(value: string | null)=>boolean, string];
    nit: [(value: string | null)=>boolean, string];
    cellphone: [(value: string | null)=>boolean, string];
    sales_representative: [(value: string | null)=>boolean, string];
    address: [(value: string | null)=>boolean, string];
    email: [(value: string | null)=>boolean, string];
}
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
    name:string,
    nit:string,
    cellphone:string,
    sales_representative:string,
    address:string,
    email:string
}
export interface formSupplierValidations {
    name: [(value: string)=>boolean, string];
    nit: [(value: string)=>boolean, string];
    cellphone: [(value: string)=>boolean, string];
    sales_representative: [(value: string)=>boolean, string];
    address: [(value: string)=>boolean, string];
    email: [(value: string)=>boolean, string];
}
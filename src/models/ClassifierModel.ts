import { GroupModel } from "./GroupModel";
 
export interface ClassifierModel{
    id:number;
    code_class:string;
    nombre:string;
    description:string;
    groups: Array<GroupModel>;
}

export interface FormClassifierModel {
    code_class:string,
    nombre:string,
    description:string
}

export interface FormClassifierValidations {
    code_class: [(value: string) => boolean, string];
    nombre: [(value: string) => boolean, string];
    description: [(value: string) => boolean, string];
}
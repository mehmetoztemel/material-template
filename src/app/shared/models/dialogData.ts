import { FormGroup } from "@angular/forms";
import { IColumns } from "./columns";

export interface IDialogDataModel {
    header: string, 
    table?: any[], 
    col?: IColumns[],
    dspCol?: string[],
    formType?:IFormComponent[],
    formGroup?:FormGroup,
    button1?:string,
    button2:string,
    card?:IDialogDataModel,
    label: string,
}
export interface IFormComponent {
    label: string,
    type: string,
    value?: any,
    control?: string,
    hide?: boolean,
    options?: any[],
    max?: number,
    min?: number,
    req?: boolean,
    readonly?:boolean;
    onChange?(data: any): void
}

export enum FormTipleri{
    text = 'text',
    number ='number',
    email ='email',
    password= 'password',
    textarea='textarea',
    dropdown='dropdown',
    checkbox='checkbox',
    date = 'date'
}
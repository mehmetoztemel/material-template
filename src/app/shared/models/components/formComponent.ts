export interface IFormComponent {
    label: string;
    type: string;
    value?: any;
    control?: string;
    hide?: boolean;
    options?: any[];
    max?: number;
    min?: number;
    req?: boolean;
    readonly?:boolean;
    onChange?(data: any): void;
}
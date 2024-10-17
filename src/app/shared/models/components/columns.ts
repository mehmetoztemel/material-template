export interface IColumns {
    field: string;
    header: string;
    colId?: string;
    type: string;
    style?: string;
    // for buttons
    click?(data: any): void;
    // for buttons
    icon?: string;
    // for buttons
    color?: string;
    disable?: string;
    buttonLabel?: string;
    align?: string;
    filter?: string;
    opt?: any[];
    hideColumn? : boolean;
  }
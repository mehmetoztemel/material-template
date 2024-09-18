import { Type } from "@angular/core";

export interface MenuItem {
    
    icon: string;
    label: string;
    path?: string;
    subItems?: MenuItem[];
    component?: Type<unknown>;
  }

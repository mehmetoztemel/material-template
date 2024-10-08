import { IDropdownOption } from "./models/components/dropdownOption";

export class Utility {
    public static getUniqueOptionsByProperty<T>(data: T[], property: keyof T): IDropdownOption[] {
      const uniqueValues = Array.from(new Set(data.map(element => element[property])));
      const options = uniqueValues.map(value => ({ viewValue: String(value), value: String(value) }));
      return options;
    }
  }
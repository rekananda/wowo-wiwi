import { PropsModalT } from ".";

export type FilterDataValueT<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? U extends object
    ? FilterDataValueT<U>
    : any
  : T[P] extends object
  ? FilterDataValueT<T[P]>
  : any;
}

export type PropsFilterTableModal<T> = {
  onFilter: (data: ColumnFilteredDataT<T>[]) => void;
  initValue?: FilterDataValueT<T>
} & PropsModalT


export type FilterFormDataT<T> = {
  [key in DeepKeysUnder<T>]?: any
};

export type PropsFormFilter<T> = {
  formName: string;
  handleSubmit: (data: FilterFormDataT<T>) => void;
  initValue?: FilterDataValueT<T>
} 
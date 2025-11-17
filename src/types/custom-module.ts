export type FieldType = "text" | "number" | "date" | "dropdown";

export interface TableHeader {
  key: string;
  label: string;
  value: string;
  type: FieldType;
}

export interface TableLayout {
  type: "table";
  props: {
    data: any[];
    tableHeaders: TableHeader[];
  };
  search: string[];
}

export interface CardLayout {
  type: "card";
  props: {
    fields: TableHeader[];
  };
}

export type Layout = TableLayout | CardLayout;

export interface CustomModuleSchema {

  title: string;
  desc: string;
  isSelected: boolean;
  path: string;
  polyhouse_id?: string;
  layout: Layout[];
}

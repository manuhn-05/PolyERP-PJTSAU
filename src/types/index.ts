import { ComponentType, ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string; // Dynamic class support
  }

  export type TABLE_HEADER_TYPE = {
    key: string;
    label: string;
  };
  export interface TABLE_COMPONENT_PROPS {
    tableHeaders : Array<TABLE_HEADER_TYPE>,
    tableBody : [] | any,
    tableName? : string,
    components? : ComponentType<any>[],
    endpoint : string,
    id_type? : string,
    container_id? : string;
    search: string[];
    
}

export const START_END_INDICATION_TIME = [
  {
      id: "time-1",
      label: "5 Minutes",
      value: 5,
  },
  {
      id: "time-2",
      label: "10 Minutes",
      value: 10,
  },
  {
      id: "time-3",
      label: "15 Minutes",
      value: 15,
  },
  {
      id: "time-4",
      label: "20 Minutes",
      value: 20,
  },
  {
      id: "time-5",
      label: "25 Minutes",
      value: 25,
  },
  {
      id: "time-6",
      label: "30 Minutes",
      value: 30,
  },
  {
      id: "time-7",
      label: "35 Minutes",
      value: 35,
  },
  {
      id: "time-8",
      label: "40 Minutes",
      value: 40,
  },
  {
      id: "time-9",
      label: "45 Minutes",
      value: 45,
  },
  {
      id: "time-10",
      label: "50 Minutes",
      value: 50,
  },
  {
      id: "time-11",
      label: "55 Minutes",
      value: 55,
  },
  {
      id: "time-12",
      label: "60 Minutes",
      value: 60,
  },
];



export type ACCESS_LEVELS_TYPE = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

type Header = { key: string; };

export type CardComponentProps = {
    tableBody: Record<string, any>[];
    cardHeaders: Header[];
    search: string[];
    endpoint: string;
    components? : ComponentType<any>[],
    id_type? : string
  };
  
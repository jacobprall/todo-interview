export interface Todo {
  id?: number;
  done?: boolean;
  label: string;
  pos?: number;
}

export interface Label {
  value: string;
}
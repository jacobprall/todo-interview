export interface Todo {
  id?: number;
  done?: boolean;
  label: Label;  
}

export interface Label {
  value: string;
}
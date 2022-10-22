export interface ToDo {
  id: number;
  label: string;
  done: boolean;
  pos: number;
}

// front end interface. Could be shared by backend if desired, just didn't do that in this implementation
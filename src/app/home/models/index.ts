export enum MenuDir {
  Up = 1,
  Down
}

export interface MenuItem {
  id: string;
  label: string;
}

export interface Message {
  id: string;
  name: string;
  text: string;
  time: number;
}

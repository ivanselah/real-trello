import { atom } from 'recoil';

export type StateProps = {
  id: number;
  text: string;
};

interface IToDoState {
  [key: string]: StateProps[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDos',
  default: {
    toDo: [
      { id: 0, text: 'Hello' },
      { id: 1, text: 'Welcome' },
      { id: 2, text: 'Welcome' },
      { id: 3, text: 'Welcome' },
    ],
    doing: [],
    done: [],
  },
});

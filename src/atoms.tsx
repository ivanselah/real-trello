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
      { id: 0, text: 'a' },
      { id: 1, text: 'b' },
      { id: 2, text: 'c' },
      { id: 3, text: 'd' },
    ],
    doing: [],
    done: [],
  },
});

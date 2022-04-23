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
    toDo: [],
    doing: [],
    done: [],
  },
});

export const VisibleState = atom({
  key: 'visible',
  default: false,
});

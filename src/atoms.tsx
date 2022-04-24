import { atom } from 'recoil';

export type StateProps = {
  id: number;
  text: string;
};

export type ToDoState = {
  [key: string]: StateProps[];
};

export const REAL_TRELLO = 'REAL_TRELLO';

const localStorageData: string = localStorage.getItem(REAL_TRELLO) || '{}';
const parsedLocalStorageTodo = JSON.parse(localStorageData);

export const toDoState = atom<ToDoState>({
  key: 'toDos',
  default: parsedLocalStorageTodo,
});

export const boardTitleState = atom<string>({
  key: 'boardTitleState',
  default: '',
});

export const selectedBoard = atom<string>({
  key: 'selectedBoardId',
  default: '',
});

export const VisibleState = atom({
  key: 'visible',
  default: false,
});

export const removeModalIsVisible = atom({
  key: 'removeModal',
  default: false,
});

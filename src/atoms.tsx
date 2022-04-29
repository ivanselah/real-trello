import { atom } from 'recoil';

export type StateProps = {
  id: number;
  text: string;
};

export type ColorProps = {
  id: 'bgColor';
  color: string;
};

export type ToDoState = {
  [key: string]: StateProps[];
};

export const REAL_TRELLO = 'REAL_TRELLO';
export const REAL_TRELLO_COLOR = 'REAL_TRELLO_COLOR';

const localStorageStateData: string = localStorage.getItem(REAL_TRELLO) || '{}';
const localStorageColorData: string = localStorage.getItem(REAL_TRELLO_COLOR) || '{}';

const parsedLocalStorageTodo = JSON.parse(localStorageStateData);
const parsedLocalStorageColor: ColorProps = JSON.parse(localStorageColorData);

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

export const setBgColor = atom({
  key: 'setBgColor',
  default: parsedLocalStorageColor.color ?? '#d1d8e0',
});

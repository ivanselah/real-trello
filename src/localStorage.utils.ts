import { ToDoState, REAL_TRELLO, ColorProps, REAL_TRELLO_COLOR } from './atoms';

export const saveTodoInLocalStorage = (result: ToDoState): void => {
  localStorage.setItem(REAL_TRELLO, JSON.stringify(result));
};

export const saveColorInLocalStorage = (colorResult: ColorProps): void => {
  localStorage.setItem(REAL_TRELLO_COLOR, JSON.stringify(colorResult));
};

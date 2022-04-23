import { ToDoState, REAL_TRELLO } from './atoms';

export const saveTodoInLocalStorage = (result: ToDoState): void => {
  localStorage.setItem(REAL_TRELLO, JSON.stringify(result));
};

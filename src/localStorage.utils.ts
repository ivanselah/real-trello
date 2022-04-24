import { ToDoState, REAL_TRELLO } from './atoms';

export const saveTodoInLocalStorage = (result: ToDoState): void => {
  localStorage.setItem(REAL_TRELLO, JSON.stringify(result));
};

export const removeTodoInLocalStorage = (boardId: string): void => {
  const dataList = localStorage.getItem(REAL_TRELLO)!;
  const copyDataList = { ...JSON.parse(dataList) };
  delete copyDataList[boardId];
  saveTodoInLocalStorage(copyDataList);
};

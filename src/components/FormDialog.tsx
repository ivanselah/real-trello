import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardTitleState, ToDoState, toDoState, VisibleState } from '../atoms';
import { useForm } from 'react-hook-form';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import ClearBtn from './shared/ClearBtn';

type Inputs = {
  boardName: string;
};

function FormDialog() {
  const [isVisible, setIsVisible] = useRecoilState(VisibleState);
  const setTodos = useSetRecoilState(toDoState);
  const setBoardTitle = useSetRecoilState(boardTitleState);
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const handleClose = () => setIsVisible(false);

  const onSumit = ({ boardName }: Inputs): void => {
    setTodos((todo: ToDoState) => {
      const result: ToDoState = { [boardName]: [], ...todo };
      saveTodoInLocalStorage(result);
      return result;
    });

    setBoardTitle(boardName);
    setValue('boardName', '');
    handleClose();
  };

  return (
    <>
      {isVisible && (
        <CustomDialog>
          <ClearBtn onClose={handleClose} />
          <h1>보드추가</h1>
          <form onSubmit={handleSubmit(onSumit)}>
            <input {...register('boardName', { required: true })} type='text' placeholder='보드명을 입력하세요' autoComplete='off' />
          </form>
        </CustomDialog>
      )}
    </>
  );
}

const CustomDialog = styled.div`
  background-color: #dfe6e9;
  position: absolute;
  right: 0;
  transform: translate(-20%, 70%);
  min-width: 250px;
  min-height: 100px;
  padding: 25px 20px;
  border-radius: 10px;

  h1 {
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    height: 35px;
    border: none;
    text-align: center;
    &::placeholder {
      padding: 10px;
      font-size: 15px;
    }
  }
`;

export default FormDialog;

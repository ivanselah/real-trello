import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import styled from 'styled-components';
import Button from '@mui/material/Button';

type CardInputs = {
  card: string;
};

function AddCardForm({ boardId }: { boardId: string }) {
  const [addFormIsVisible, setAddFormIsVisible] = useState(false);
  const setTodosState = useSetRecoilState(toDoState);
  const { register, handleSubmit, getValues, setValue, setFocus } = useForm<CardInputs>();

  const onClickAdd = () => {
    setAddFormIsVisible((visible) => !visible);
    setFocus('card');
  };

  const onSubmit = () => {
    const { card } = getValues();
    const newObject = {
      id: Date.now(),
      text: card,
    };
    setTodosState((todos) => {
      const newTodos = {
        ...todos,
        [boardId]: [...todos[boardId], newObject],
      };
      saveTodoInLocalStorage(newTodos);
      return newTodos;
    });
    setValue('card', '');
    onClickAdd();
  };
  return (
    <TextareaContainer>
      <AddContentBtn onClick={onClickAdd}>+ 카드 추가</AddContentBtn>
      <CustomForm addFormIsVisible={addFormIsVisible} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('card', { required: true })} autoComplete='off' type='text' placeholder='여기에 내용을 입력하세요' />
      </CustomForm>
    </TextareaContainer>
  );
}

const TextareaContainer = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px;
`;

const AddContentBtn = styled(Button)`
  width: 100px;
  height: 38px;
  z-index: 1;
  color: #ffffff;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const CustomForm = styled.form<{ addFormIsVisible: boolean }>`
  padding-top: 10px;
  padding-right: 5px;
  height: ${(props) => !props.addFormIsVisible && '0px'};
  input {
    opacity: ${(props) => (props.addFormIsVisible ? '1' : '0')};
    text-align: left;
    min-height: 70px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.cardColor};
    min-width: 100%;
    height: 35px;
    border: none;
    &::placeholder {
      font-size: 15px;
    }
  }
`;

export default AddCardForm;

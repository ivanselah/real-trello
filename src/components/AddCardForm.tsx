import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { StateProps, toDoState } from '../atoms';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import styled from 'styled-components';
import Button from '@mui/material/Button';

type CardInputs = {
  card: string;
};

type AddCardFromProps = {
  boardId: string;
  addFormIsVisible: boolean;
  setAddFormIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cardEditFormIsVisible: boolean;
  eitFormHandleClose: () => void;
  selectedCard: StateProps;
};

const pholder = {
  add: '여기에 내용을 입력하세요',
  edit: '수정할 내용을 입력하세요',
};

function AddCardForm({
  boardId,
  cardEditFormIsVisible = false,
  addFormIsVisible,
  setAddFormIsVisible,
  eitFormHandleClose,
  selectedCard,
}: AddCardFromProps) {
  const setTodosState = useSetRecoilState(toDoState);
  const [cardInputValue, setCardInputValue] = useState<string>(selectedCard.text ?? '');
  const { register, handleSubmit, getValues, setValue, setFocus } = useForm<CardInputs>();

  useEffect(() => {
    selectedCard && setCardInputValue(selectedCard.text);
  }, [selectedCard]);

  const onClickAdd = useCallback(() => {
    setAddFormIsVisible((visible) => !visible);
    setValue('card', '');
    setFocus('card');
  }, [setValue, setFocus, setAddFormIsVisible]);

  useEffect(() => {
    cardEditFormIsVisible && onClickAdd();
  }, [cardEditFormIsVisible, onClickAdd]);

  const onSubmit = () => {
    const { card } = getValues();
    if (!cardEditFormIsVisible) {
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
    } else {
      setTodosState((todos) => {
        return {
          ...todos,
          [boardId]: todos[boardId].map((cardItem) => {
            if (Number(selectedCard.id) === Number(cardItem.id)) {
              return {
                ...cardItem,
                text: card,
              };
            } else {
              return cardItem;
            }
          }),
        };
      });

      eitFormHandleClose();
    }
    setValue('card', '');
    onClickAdd();
  };

  return (
    <TextareaContainer>
      {cardEditFormIsVisible === false && (
        <AddContentBtn cardeditformisvisible={cardEditFormIsVisible ? 'true' : 'false'} onClick={onClickAdd}>
          + 카드 추가
        </AddContentBtn>
      )}
      {cardEditFormIsVisible ? (
        <CustomFormEdit cardEditFormIsVisible={cardEditFormIsVisible} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('card', { required: true, onChange: (e) => setCardInputValue(e.currentTarget.value) })}
            value={cardInputValue}
            autoComplete='off'
            type='text'
            placeholder={pholder.edit}
          />
        </CustomFormEdit>
      ) : (
        <CustomForm addFormIsVisible={addFormIsVisible} onSubmit={handleSubmit(onSubmit)}>
          <input {...register('card', { required: true })} autoComplete='off' type='text' placeholder={pholder.add} />
        </CustomForm>
      )}
    </TextareaContainer>
  );
}

const TextareaContainer = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px;
`;

const AddContentBtn = styled(Button)<{ cardeditformisvisible: string }>`
  display: ${(props) => (props.cardeditformisvisible === 'true' ? 'none' : 'block')};
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

const CustomFormEdit = styled.form<{ cardEditFormIsVisible: boolean }>`
  padding-right: 5px;
  input {
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

export default React.memo(AddCardForm);

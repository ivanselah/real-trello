import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { removeModalIsVisible, selectedBoard, StateProps, toDoState } from '../atoms';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { useForm } from 'react-hook-form';
import ClearBtn from './shared/ClearBtn';
import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { styled as muiStyled } from '@mui/material/styles';
import { saveTodoInLocalStorage } from '../localStorage.utils';

type BoardsProps = {
  boardId: string;
  toDos: StateProps[];
};

type CardInputs = {
  card: string;
};

function Board({ boardId, toDos }: BoardsProps) {
  const [addFormIsVisible, setAddFormIsVisible] = useState(false);
  const setTodosState = useSetRecoilState(toDoState);
  const setIsVisible = useSetRecoilState(removeModalIsVisible);
  const setSelectedBoardId = useSetRecoilState(selectedBoard);
  const { register, handleSubmit, getValues, setValue, setFocus } = useForm<CardInputs>();

  const handleClose = (boardId: string) => {
    setIsVisible(true);
    setSelectedBoardId(boardId);
  };

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
  // draggingFromThisWith={Boolean(snapshots.draggingFromThisWith)}
  return (
    <BoardsWrapper>
      <ClearBtn onClose={() => handleClose(boardId)} />
      <Title>{boardId}</Title>
      <AddContentBtn onClick={onClickAdd}>내용 추가</AddContentBtn>
      <CustomForm addFormIsVisible={addFormIsVisible} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('card', { required: true })} type='text' autoComplete='off' placeholder='내용을 입력하세요' />
      </CustomForm>
      <Droppable droppableId={boardId}>
        {(provided, snapshots) => (
          <ContainerList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshots.isDraggingOver}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </ContainerList>
        )}
      </Droppable>
    </BoardsWrapper>
  );
}

const BoardsWrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  border-radius: 15px;
`;

const CustomForm = styled.form<{ addFormIsVisible: boolean }>`
  width: 100%;
  margin-bottom: 20px;
  input {
    margin-top: 15px;
    border-radius: 5px;
    min-width: 285px;
    height: 35px;
    border: none;
    text-align: center;
    transform: ${(props) => (props.addFormIsVisible ? 'translateY(0)' : 'translateY(-140%)')};
    transition: transform 0.3s ease-in-out;
    &::placeholder {
      padding: 10px;
      font-size: 15px;
    }
  }
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

const AddContentBtn = muiStyled(Button)({
  height: '38px',
  zIndex: '1',
  color: '#000000',
  backgroundColor: '#ffffff',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: '#fd79a8',
  },
});

const ContainerList = styled.ul<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? 'red' : 'inherit')};
`;

export default Board;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { removeModalIsVisible, selectedBoard, StateProps, toDoState } from '../atoms';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { useForm } from 'react-hook-form';
import ClearBtn from './shared/ClearBtn';
import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
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
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 0);
  }, []);

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
  return (
    <>
      {isLoad ? (
        <Container>
          <ClearBtn onClose={() => handleClose(boardId)} />
          <Droppable droppableId={boardId}>
            {(provided, snapshots) => (
              <BoardsWrapper>
                <Title>{boardId}</Title>
                {toDos.length ? <CardCount>{`${toDos.length} cards`}</CardCount> : <p></p>}
                <ContainerList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshots.isDraggingOver}
                  draggingFromThisWith={Boolean(snapshots.draggingFromThisWith)}
                >
                  {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                  ))}
                  {provided.placeholder}
                </ContainerList>
              </BoardsWrapper>
            )}
          </Droppable>
          <TextareaContainer>
            <AddContentBtn onClick={onClickAdd}>+ 카드 추가</AddContentBtn>
            <CustomForm addFormIsVisible={addFormIsVisible} onSubmit={handleSubmit(onSubmit)}>
              <input {...register('card', { required: true })} autoComplete='off' type='text' placeholder='여기에 내용을 입력하세요' />
            </CustomForm>
          </TextareaContainer>
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.div`
  position: relative;
  padding: 10px;
  margin: 0 5px;
  width: 300px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.boardColor};
    border: 1px solid transparent;
    border-radius: 10px;
    background-clip: padding-box;
  }
`;

const BoardsWrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const TextareaContainer = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px;
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
      padding: 10px;
      font-size: 15px;
    }
  }
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 25px;
  text-align: center;
  margin: 20px 0;
`;

const CardCount = styled.p`
  font-weight: bold;
  padding: 0 15px;
  color: ${(props) => props.theme.bgColor};
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

const ContainerList = styled.ul<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  background-color: ${(props) => (props.draggingFromThisWith ? '#ff6348' : props.isDraggingOver ? '#20bf6b' : 'inherit')};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
  height: calc(100% - 30px);
`;

export default Board;

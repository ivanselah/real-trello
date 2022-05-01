import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { removeModalIsVisible, selectedBoard, StateProps, toDoState, VisibleState } from '../atoms';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';

type BoardsProps = {
  boardId: string;
  toDos: StateProps[];
};

type CardInputs = {
  card: string;
};

type CurrentActions = 'delete' | 'modification';

function DropDown({ handleRemove, boardId, handleClose }: { handleRemove: () => void; boardId: string; handleClose: () => void }) {
  const setIsVisible = useSetRecoilState(VisibleState);
  const setSelectedBoardId = useSetRecoilState(selectedBoard);

  const currentTargetBoard = (action: CurrentActions) => {
    switch (action) {
      case 'delete': {
        handleRemove();
        break;
      }
      case 'modification': {
        setIsVisible({ visible: true, from: 'boardBtn' });
        break;
      }
      default:
        break;
    }
    setSelectedBoardId(boardId);
    handleClose();
  };

  return (
    <DropDownContainer>
      <Navigator>
        <div></div>
        <h1>Setting</h1>
        <ClearIcon className='exitIcon' onClick={handleClose} />
      </Navigator>
      <BorderLine></BorderLine>
      <MenuList>
        <li onClick={() => currentTargetBoard('delete')}>보드삭제...</li>
        <li onClick={() => currentTargetBoard('modification')}>보드타이틀수정...</li>
      </MenuList>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  z-index: 2;
  position: absolute;
  left: 80px;
  top: 60px;
  width: 200px;
  height: 300px;
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const Navigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: bold;
  color: white;
  div {
    width: 20px;
  }
  margin-bottom: 10px;
  .exitIcon {
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const BorderLine = styled.div`
  border: 1px solid white;
  opacity: 0.5;
`;

const MenuList = styled.ul`
  color: white;
  font-weight: 400;
  padding: 15px;
  li {
    padding: 5px;
    margin-bottom: 5px;
  }
  li:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  cursor: pointer;
`;

function Board({ boardId, toDos }: BoardsProps) {
  const [addFormIsVisible, setAddFormIsVisible] = useState(false);
  const setTodosState = useSetRecoilState(toDoState);
  const setIsVisible = useSetRecoilState(removeModalIsVisible);
  const { register, handleSubmit, getValues, setValue, setFocus } = useForm<CardInputs>();
  const [isLoad, setIsLoad] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 0);
  }, []);

  const handleRemove = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsDropDownVisible((visible) => !visible);
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
          {isDropDownVisible && <DropDown handleRemove={() => handleRemove()} boardId={boardId} handleClose={handleClose} />}
          <Droppable droppableId={boardId}>
            {(provided, snapshots) => (
              <BoardsWrapper>
                <TitleContainer>
                  <Title>{boardId}</Title>
                  <MoreHorizCustomIcon onClick={handleClose} />
                </TitleContainer>
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
  height: 850px;
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
      font-size: 15px;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const MoreHorizCustomIcon = styled(MoreHorizIcon)`
  &:hover {
    background-color: ${(props) => props.theme.cardColor};
  }
  opacity: 0.5;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 17px;
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

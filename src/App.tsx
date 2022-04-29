import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { removeModalIsVisible, setBgColor, toDoState, VisibleState } from './atoms';
import { saveTodoInLocalStorage } from './localStorage.utils';
import Board from './components/Board';
import Button from '@mui/material/Button';
import { styled as muiStyled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from './components/FormDialog';
import AlertModal from './components/AlertModal';
import Garbage from './components/Garbage';
import { initialTheme } from './theme';
import GlobalStyles from './styles';
import PickColor from './components/PickColor';

function App() {
  const [allBoards, setAllBoardsToDos] = useRecoilState(toDoState);
  const bgColor = useRecoilValue(setBgColor);
  const removeAlertIsVisible = useRecoilValue(removeModalIsVisible);
  const setIsVisible = useSetRecoilState(VisibleState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const boardId = destination.droppableId;
    const currentBoard = [...allBoards[source.droppableId]];
    const dragGrab = currentBoard[source.index];
    if (source.droppableId === destination.droppableId) {
      currentBoard.splice(source.index, 1);
      currentBoard.splice(destination.index, 0, dragGrab);
      setAllBoardsToDos((allBoards) => {
        return {
          ...allBoards,
          [boardId]: currentBoard,
        };
      });
    } else {
      currentBoard.splice(source.index, 1);
      if (allBoards[destination.droppableId]) {
        const targetBoard = [...allBoards[destination.droppableId]];
        targetBoard.splice(destination.index, 0, dragGrab);
        setAllBoardsToDos((allBoards) => {
          return {
            ...allBoards,
            [source.droppableId]: currentBoard,
            [boardId]: targetBoard,
          };
        });
      } else {
        setAllBoardsToDos((allBoards) => {
          return {
            ...allBoards,
            [source.droppableId]: currentBoard,
          };
        });
      }
    }
  };

  useEffect(() => {
    saveTodoInLocalStorage(allBoards);
  }, [allBoards]);

  const openDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setIsVisible((visible) => !visible);
    }
  };
  return (
    <ThemeProvider theme={initialTheme(bgColor)}>
      <GlobalStyles />
      <Container>
        <AddListBtn variant='contained' onClick={openDialog}>
          <AddIcon /> 보드 만들기
          <PickColor />
        </AddListBtn>
        <FormDialog />
        {removeAlertIsVisible && <AlertModal />}
        <DragDropContext onDragEnd={onDragEnd}>
          <Garbage />
          <Wrapper>
            <Boards>
              {Object.keys(allBoards).map((key) => {
                return <Board key={key} boardId={key} toDos={allBoards[key]} />;
              })}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export const AddListBtn = muiStyled(Button)({
  position: 'absolute',
  right: '0',
  transform: 'translate(-50%, 160%)',
  padding: '10px 15px',
  color: '#000000',
  textTransform: 'none',
  backgroundColor: '#ffffff',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: '#fd79a8',
  },
});

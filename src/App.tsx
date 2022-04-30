import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { removeModalIsVisible, setBgColor, toDoState, VisibleState } from './atoms';
import { saveTodoInLocalStorage } from './localStorage.utils';
import Board from './components/Board';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from './components/FormDialog';
import AlertModal from './components/AlertModal';
import Garbage from './components/Garbage';
import { initialTheme } from './theme';
import GlobalStyles from './styles';
import PickColor from './components/PickColor';
import PanToolIcon from '@mui/icons-material/PanTool';

function App() {
  const [allBoards, setAllBoardsToDos] = useRecoilState(toDoState);
  const bgColor = useRecoilValue(setBgColor);
  const removeAlertIsVisible = useRecoilValue(removeModalIsVisible);
  const setIsVisible = useSetRecoilState(VisibleState);

  const onDragEnd = ({ destination, source, type }: DropResult) => {
    console.log(destination, source);
    if (!destination) return;
    if (source.droppableId === 'boards-box' && type === 'COLUMN') {
      const newAllBoardsArray = Object.entries(allBoards);
      const [grabData] = newAllBoardsArray.splice(source.index, 1);
      newAllBoardsArray.splice(destination.index, 0, grabData);
      setAllBoardsToDos(Object.fromEntries(newAllBoardsArray));
    } else {
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
        </AddListBtn>
        <FormDialog />
        {removeAlertIsVisible && <AlertModal />}
        <DragDropContext onDragEnd={onDragEnd}>
          <Garbage />
          <PickColor />
          <Wrapper>
            <Droppable droppableId='boards-box' direction='horizontal' type='COLUMN'>
              {(provided) => (
                <Boards boardCount={Object.keys(allBoards).length} ref={provided.innerRef}>
                  {Object.keys(allBoards).map((key, index) => {
                    return (
                      <Draggable draggableId={key} index={index} key={key}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <HandIconWrapper {...provided.dragHandleProps}>
                              <PanToolIcon />
                            </HandIconWrapper>
                            <Board key={key} boardId={key} toDos={allBoards[key]} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Boards>
              )}
            </Droppable>
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
  align-items: center;
  overflow-x: scroll;
`;

const Boards = styled.div<{ boardCount: number }>`
  display: grid;
  height: 1000px;
  margin: 0 5px;
  margin-top: 180px;
  padding-bottom: 20px;
  grid-template-columns: repeat(${(props) => props.boardCount}, auto);
`;

const HandIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  color: white;
`;

export const AddListBtn = styled(Button)`
  position: absolute;
  right: 0;
  transform: translate(-50%, 160%);
  padding: 10px 15px;
  color: #000000;
  text-transform: none;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: #fd79a8;
  }
`;

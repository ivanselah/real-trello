import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { toDoState } from './atoms';
import Board from './components/Board';

function App() {
  const [allBoards, setAllBoardsToDos] = useRecoilState(toDoState);

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
      const targetBoard = [...allBoards[destination.droppableId]];
      currentBoard.splice(source.index, 1);
      targetBoard.splice(destination.index, 0, dragGrab);
      setAllBoardsToDos((allBoards) => {
        return {
          ...allBoards,
          [source.droppableId]: currentBoard,
          [boardId]: targetBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(allBoards).map((key) => {
            return <Board key={key} boardId={key} toDos={allBoards[key]} />;
          })}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

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

import React from 'react';
import styled from 'styled-components';
import { StateProps } from '../atoms';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';

type BoardsProps = {
  boardId: string;
  toDos: StateProps[];
};

function Board({ boardId, toDos }: BoardsProps) {
  return (
    <BoardsWrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </ul>
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

const Title = styled.h1`
  font-weight: 900;
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

export default Board;

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { VscEdit } from 'react-icons/vsc';

type DraggableCardProps = {
  toDoId: number;
  toDoText: string;
  index: number;
};

function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  return (
    <React.Fragment>
      <Draggable draggableId={toDoId + ''} index={index}>
        {(provided, snapshot) => (
          <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
            <div className='card-box'>
              <p>{toDoText}</p>
              <CustomVscEdit />
            </div>
          </Card>
        )}
      </Draggable>
    </React.Fragment>
  );
}

const Card = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-weight: 400;
  &:hover {
    background-color: #f1f2f6;
  }
  transition: opacity 0.5s ease-in-out;
  box-shadow: ${(props) => (props.isDragging ? '1px 2px 5px 0px rgba(0, 0, 0, 0.75)' : 'none')};
  p {
    width: 230px;
    word-wrap: break-word;
  }
  .card-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CustomVscEdit = styled(VscEdit)`
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.cardColor};
  }
`;

export default React.memo(DraggableCard);

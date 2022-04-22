import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

type DraggableCardProps = {
  toDoId: number;
  toDoText: string;
  index: number;
};

function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  return (
    <Draggable draggableId={String(toDoId)} index={index}>
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

export default DraggableCard;

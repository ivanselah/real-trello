import { Droppable } from 'react-beautiful-dnd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

function Garbage() {
  return (
    <>
      <Droppable droppableId='garbage'>
        {(provided, snapshots) => {
          return (
            <IconContainer ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshots.isDraggingOver}>
              {snapshots.isDraggingOver ? <DeleteIcon sx={sx} /> : <DeleteOutlineIcon sx={sx} />}
            </IconContainer>
          );
        }}
      </Droppable>
    </>
  );
}

const IconContainer = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  transform: translate(50%, 40%);
  width: 100px;
  height: 100px;
  color: ${(props) => props.theme.boardColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDraggingOver ? 'rgba(233, 233, 233, 0.3)' : 'none')};
  transition: background 0.3s ease-in-out;
`;

const sx = {
  fontSize: '80px',
};

export default Garbage;

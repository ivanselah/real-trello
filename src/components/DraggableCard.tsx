import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { VscEdit, VscSave } from 'react-icons/vsc';

type DraggableCardProps = {
  toDoId: number;
  toDoText: string;
  index: number;
};

function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  const [todoText, setTodoText] = useState(toDoText);
  const [isClickEditBtn, setIsClickEditBtn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const cardEditHandler = () => {
    inputRef.current?.focus();
    setIsClickEditBtn(true);
  };

  return (
    <CardContainer>
      <Draggable draggableId={toDoId + ''} index={index}>
        {(provided, snapshot) => (
          <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
            <div className='card-box' onClick={cardEditHandler}>
              {isClickEditBtn ? <p></p> : <p>{toDoText}</p>}
              <CustomVscEdit />
            </div>
          </Card>
        )}
      </Draggable>
      <EditForm onSubmit={(e) => e.preventDefault()}>
        <div className='card-box'>
          {isClickEditBtn && <input ref={inputRef} type='text' value={todoText} onChange={(e) => setTodoText(e.currentTarget.value)} />}
        </div>
      </EditForm>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
`;

const EditForm = styled.form`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  background-color: inherit;
  border: none;
  input {
    border: 1px solid ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width: 210px;
    height: 25px;
    color: white;
    padding: 10px;
    margin-bottom: 0;
    font-size: 16px;
  }
`;

const Card = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
  margin-bottom: 10px;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  font-weight: 400;
  &:hover {
    background-color: #f1f2f6;
  }
  transition: opacity 0.5s ease-in-out;
  box-shadow: ${(props) => (props.isDragging ? '1px 2px 5px 0px rgba(0, 0, 0, 0.75)' : 'none')};
  p {
    font-size: 16px;
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
    cursor: pointer;
  }
`;

export default React.memo(DraggableCard);

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { removeModalIsVisible, selectedBoard, StateProps, VisibleState } from '../atoms';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { useSetRecoilState } from 'recoil';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import AddCardForm from './AddCardForm';

type BoardsProps = {
  boardId: string;
  toDos: StateProps[];
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
  const [isLoad, setIsLoad] = useState(false);
  const [addFormIsVisible, setAddFormIsVisible] = useState(false);
  const [cardEditFormIsVisible, setCardEditFormIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<StateProps>({ id: 0, text: '' });
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const setIsVisible = useSetRecoilState(removeModalIsVisible);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 0);
  }, []);

  const eitFormHandleClose = () => {
    setAddFormIsVisible((visible) => !visible);
    setCardEditFormIsVisible((visible) => {
      if (visible) {
        setAddFormIsVisible(false);
        return false;
      } else return true;
    });
  };

  const handleRemove = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsDropDownVisible((visible) => !visible);
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
                    <DraggableCard
                      key={toDo.id}
                      index={index}
                      toDoId={toDo.id}
                      toDoText={toDo.text}
                      eitFormHandleClose={eitFormHandleClose}
                      setSelectedCard={setSelectedCard}
                    />
                  ))}
                  {provided.placeholder}
                </ContainerList>
              </BoardsWrapper>
            )}
          </Droppable>
          <AddCardForm
            boardId={boardId}
            addFormIsVisible={addFormIsVisible}
            setAddFormIsVisible={setAddFormIsVisible}
            cardEditFormIsVisible={cardEditFormIsVisible}
            eitFormHandleClose={eitFormHandleClose}
            selectedCard={selectedCard}
          />
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

const ContainerList = styled.ul<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  background-color: ${(props) => (props.draggingFromThisWith ? '#ff6348' : props.isDraggingOver ? '#20bf6b' : 'inherit')};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

export default Board;

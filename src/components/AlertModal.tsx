import styled from 'styled-components';
import ClearBtn from './ClearBtn';
import Button from '@mui/material/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeModalIsVisible, selectedBoard, REAL_TRELLO, toDoState } from '../atoms';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import { useCallback } from 'react';

function AlertModal() {
  const setIsVisible = useSetRecoilState(removeModalIsVisible);
  const [selectedBoardId, setSelectedBoardId] = useRecoilState(selectedBoard);
  const setToDoState = useSetRecoilState(toDoState);
  const handleClose = () => setIsVisible(false);

  const removeTodoInLocalStorage = useCallback(
    (boardId: string): void => {
      const dataList = localStorage.getItem(REAL_TRELLO)!;
      const copyDataList = { ...JSON.parse(dataList) };
      delete copyDataList[boardId];
      saveTodoInLocalStorage(copyDataList);
      setToDoState(copyDataList);
    },
    [setToDoState]
  );

  const clickRemoveBtn = () => {
    removeTodoInLocalStorage(selectedBoardId);
    setSelectedBoardId('');
    handleClose();
  };

  return (
    <ModalWrapper>
      <ModalBox>
        <ClearBtn onClose={handleClose} />
        <h4>정말로 삭제하시겠습니까?</h4>
        <RemoveBtn variant='contained' onClick={clickRemoveBtn}>
          YES
        </RemoveBtn>
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ModalBox = styled.div`
  min-width: 500px;
  min-height: 150px;
  padding: 20px;
  background-color: ${(props) => props.theme.boardColor};
  text-align: center;
  border-radius: 15px;
  h4 {
    margin: 15px 0;
    font-size: 25px;
    font-weight: 500;
  }
`;

const RemoveBtn = styled(Button)`
  color: #000000;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

export default AlertModal;

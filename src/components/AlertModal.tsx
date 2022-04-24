import styled from 'styled-components';
import ClearBtn from './shared/ClearBtn';
import Button from '@mui/material/Button';
import { styled as muiStyled } from '@mui/material/styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeModalIsVisible, selectedBoard } from '../atoms';
import { removeTodoInLocalStorage } from '../localStorage.utils';

function AlertModal() {
  const setIsVisible = useSetRecoilState(removeModalIsVisible);
  const [selectedBoardId, setSelectedBoardId] = useRecoilState(selectedBoard);
  const handleClose = () => setIsVisible(false);
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

const RemoveBtn = muiStyled(Button)({
  color: '#000000',
  backgroundColor: '#ffffff',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: '#fd79a8',
  },
});

export default AlertModal;

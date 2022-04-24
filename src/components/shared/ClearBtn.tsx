import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

type ClearBtnProps = {
  onClose: () => void;
};

function ClearBtn({ onClose }: ClearBtnProps) {
  return (
    <CustomClearBox>
      <div></div>
      <div className='clearBox' onClick={onClose}>
        <ClearIcon />
      </div>
    </CustomClearBox>
  );
}

const CustomClearBox = styled.div`
  display: flex;
  justify-content: space-between;
  .clearBox {
    display: flex;
    text-align: end;
    background-color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default ClearBtn;

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardTitleState, selectedBoard, ToDoState, toDoState, VisibleState } from '../atoms';
import { useForm } from 'react-hook-form';
import { saveTodoInLocalStorage } from '../localStorage.utils';
import ClearBtn from './ClearBtn';
import { VscEdit } from 'react-icons/vsc';

type Inputs = {
  boardName: string;
};

function FormDialog() {
  const [isVisible, setIsVisible] = useRecoilState(VisibleState);
  const setTodos = useSetRecoilState(toDoState);
  const setBoardTitle = useSetRecoilState(boardTitleState);
  const [selectedCurrentBoardId, setSelectedCurrentBoardId] = useRecoilState(selectedBoard);
  const { register, handleSubmit, setValue, setFocus } = useForm<Inputs>();

  const handleClose = () => {
    setIsVisible((state) => {
      return {
        ...state,
        visible: false,
      };
    });
    setSelectedCurrentBoardId('');
  };

  const onSumit = ({ boardName }: Inputs): void => {
    if (!selectedCurrentBoardId) {
      setTodos((todo: ToDoState) => {
        const result: ToDoState = { [boardName]: [], ...todo };
        saveTodoInLocalStorage(result);
        return result;
      });
      setBoardTitle(boardName);
    } else {
      setTodos((todos) => {
        return Object.fromEntries(
          Object.entries(todos).map((arr) => {
            if (arr.includes(selectedCurrentBoardId)) {
              const { 1: boardArray } = arr;
              return [boardName, boardArray];
            } else {
              return arr;
            }
          })
        );
      });
    }
    setValue('boardName', '');
    handleClose();
    setSelectedCurrentBoardId('');
  };

  useEffect(() => {
    isVisible.visible && setFocus('boardName');
  }, [isVisible.visible, setFocus]);

  return (
    <>
      <CustomDialog isVisible={isVisible.visible}>
        <ClearBtn onClose={handleClose} />
        <h1>
          {isVisible.from === 'globalBtn' ? (
            '보드추가'
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {selectedCurrentBoardId && selectedCurrentBoardId}
              <VscEdit />
            </div>
          )}
        </h1>
        <form className='formContainer' onSubmit={handleSubmit(onSumit)}>
          <input {...register('boardName', { required: true })} type='text' placeholder='보드명을 입력하세요' autoComplete='off' />
        </form>
      </CustomDialog>
    </>
  );
}

const CustomDialog = styled.div<{ isVisible: boolean }>`
  background-color: #dfe6e9;
  position: absolute;
  right: 0;
  transform: translate(-18%, 70%);
  min-width: 250px;
  min-height: 150px;
  padding: 25px 20px;
  border-radius: 10px;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  z-index: ${(props) => (!props.isVisible ? '-1' : '2')};
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);

  .formContainer {
    padding-right: 0;
    height: 50px;
    background-color: ${(props) => props.theme.bgColor};
  }

  h1 {
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    width: 300px;
    height: 35px;
    border: none;
    text-align: center;
    &::placeholder {
      padding: 10px;
      font-size: 15px;
    }
  }
`;

export default FormDialog;

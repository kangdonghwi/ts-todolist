import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import { ITodo } from 'types/index';
import { storage } from 'utils/Tokens';
import { useTodosDispatch } from 'constants/index';

interface TodoItemDetailProps {
  id: number;
  taskName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  importance: string;
}

const TodoItemDetail = ({
  id,
  taskName,
  status,
  createdAt,
  updatedAt,
  importance,
}: TodoItemDetailProps): ReactElement => {
  const [edit, setEdit] = useState(false);
  const [textFirstEdit, setTextFirstEdit] = useState(true);

  const [newText, setNewText] = useState(taskName);
  const [newImportance, setNewImportance] = useState(importance);
  const dispatch = useTodosDispatch();

  const handleEdit = () => {
    if (!edit) {
      setEdit(!edit);
      return;
    }

    if (edit) {
      updateData();
      setEdit(!edit);
    }
  };

  const getDateOfLastUpdate = () => {
    const date = new Date().toISOString().slice(0, 10);
    return date;
  };

  const handleCheckEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSelectedId = e.target.id;
    currentSelectedId === newImportance
      ? setNewImportance('none')
      : setNewImportance(currentSelectedId);
  };

  const handleTextareaOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const currentText = e.target.value;
    setNewText(currentText);
  };

  const handleTextareaFocus = () => {
    textFirstEdit && setNewText('');
    setTextFirstEdit(false);
  };

  const updateData = () => {
    dispatch({
      type: 'UPDATE',
      id: id,
      newText: newText,
      newDate: getDateOfLastUpdate(),
      newImportance: newImportance,
    });
  };

  return (
    <TodoItemDetailWrapper>
      <div>
        <SideTabTitle>
          {!edit ? (
            <>
              <span>{status}</span>
              <span id="taskName">{newText}</span>
            </>
          ) : (
            <>
              <span>{status}</span>
              <TextArea
                value={newText}
                onChange={handleTextareaOnChange}
                onFocus={handleTextareaFocus}
              ></TextArea>
            </>
          )}
        </SideTabTitle>
        <ItemContent>
          {!edit ? (
            newImportance !== 'none' ? (
              '중요도 ' + newImportance
            ) : (
              '중요도 없음'
            )
          ) : (
            <>
              <CheckBoxWrapper>
                <CustomCheckBox
                  className="high"
                  labelText="중요해요!"
                  id="high"
                  checked={newImportance === 'high'}
                  checkHandler={handleCheckEvent}
                />
                <CustomCheckBox
                  className="low"
                  labelText="여유있어요"
                  id="low"
                  checked={newImportance === 'low'}
                  checkHandler={handleCheckEvent}
                />
              </CheckBoxWrapper>
            </>
          )}
        </ItemContent>
        <ItemContent>
          <span>created at</span>
          <span>{createdAt}</span>
        </ItemContent>
        <ItemContent>
          <span>last update at</span>
          <span>{updatedAt}</span>
        </ItemContent>
      </div>
      <ButtonWrapper>
        <LongButton onClick={handleEdit}>{!edit ? 'EDIT' : 'OK'}</LongButton>
        <RedButton>DELETE</RedButton>
      </ButtonWrapper>
    </TodoItemDetailWrapper>
  );
};

const TodoItemDetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`;

const SideTabTitle = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 3rem;

  span:first-child {
    margin-right: 0.8rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  resize: none;
`;

const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 2.5rem;
  font-size: 1.4rem;
  color: #8a8a8a;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div``;

const LongButton = styled.button`
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  cursor: pointer;
  margin-top: 0.8rem;
  padding: 0.8rem;
`;

const RedButton = styled(LongButton)`
  background-color: #eb7e7e;
  color: #fff;
  border: 1px solid #ca6d6d;
`;

export default TodoItemDetail;

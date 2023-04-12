import { useState } from "react";
import styled from "styled-components";
import { addRoutine, addTodo } from "../reducer/Controller";
import { useDispatch } from "react-redux";

const AddBtn = styled.button`
  width: 100%;
  height: 30px;
  border: 2px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  transition: all 0.3s ease;
  :hover {
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
`;

const AddFormWrapper = styled.div``;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const CheckInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 99%;
  height: 30px;
  border: none;
  background-color: #f0f0f0;
  /* padding: 0 5px; */
  /* margin-right: 5px; */
  font-family: "Lato", sans-serif;
  font-weight: 500;
  :disabled {
    background-color: #d0d0d0;
  }
`;

const InputDateTime = styled.input`
  width: 80%;
  height: 30px;
  margin: 1px;
  border: none;
  background-color: #f0f0f0;
  /* padding: 0 5px; */
  /* margin-right: 5px; */
  font-family: "Lato", sans-serif;
  font-weight: 500;
  :disabled {
    background-color: #d0d0d0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const Label = styled.label`
  width: 100%;
  color: #000;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  margin-right: 10px;
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 30px;
  border: none;
  background-color: #000;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  :hover {
    background-color: #fff;
    color: #000;
  }
`;

const CloseBtn = styled.button`
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const AddForm = () => {
  const [title, setTitle] = useState(""); // 입력한 내용
  const [date, setDate] = useState(""); // 선택한 날짜
  const [time, setTime] = useState(""); // 선택한 시간
  const [routine, setRoutine] = useState(false); // 루틴 체크 여부 ==> 이에 따라 submit 시 store에 추가하는 데이터가 달라짐
  const [todo, setTodo] = useState(false); // 투두 체크 여부
  const [visible, setVisible] = useState(false); // 폼 보이기 여부
  const dispatch = useDispatch();

  const handleToggleForm = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    // console.log(visible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // store에 데이터 추가 === todo와 routine을 구분해서 추가
    const handleRoutineSumit = () => {
      dispatch(addRoutine({ title, time }));
      setTitle("");
      setDate("");
      setTime("");
      setRoutine(false);
      setTodo(false);
    };

    const handleTodoSubmit = () => {
      dispatch(addTodo({ title, date, time }));
      setTitle("");
      setDate("");
      setTime("");
      setRoutine(false);
      setTodo(false);
    };

    if (routine === true) {
      handleRoutineSumit();
    } else {
      handleTodoSubmit();
    }
  };

  return (
    <AddFormWrapper>
      {visible === false ? (
        <AddBtn block onClick={handleToggleForm}>
          +
        </AddBtn>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <CheckboxWrapper>
            <CheckInput
              type="checkbox"
              checked={routine}
              onChange={(e) => setRoutine(e.target.checked)}
            />
            <Label htmlFor="routine">Routine</Label>
            <CheckInput
              type="checkbox"
              checked={todo}
              onChange={(e) => setTodo(e.target.checked)}
            />
            <Label htmlFor="todo">To do</Label>
          </CheckboxWrapper>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputWrapper>
            <InputDateTime
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={routine} // 루틴 체크 시 비활성화
            />
            <InputDateTime
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </InputWrapper>
          <SubmitBtn type="submit" onClick={handleSubmit}>
            Add!
          </SubmitBtn>
          <CloseBtn onClick={handleToggleForm}>-</CloseBtn>
        </StyledForm>
      )}
    </AddFormWrapper>
  );
};

export default AddForm;

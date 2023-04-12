import RoutineList from "../components/RoutineList";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineCheckSquare } from 'react-icons/ai';


const RoutineWrapper = styled.div``;

const RoutineGoalInputWrapper = styled.div`
  position: relative;
`;

const RoutineGoalInput = styled.input`
  display: flex;
  align-items: center;
  width: 98%;
  height: 60px;
  margin-bottom: 20px;
`;

const RoutineEditButton = styled.button`
  all : unset;
  position: absolute;
  top: 0;
  right: 0;
`;

const RoutineSaveButton = styled.button`
  all : unset;
  position: absolute;
  top: 0;
  right: 0;
`;
const RoutinePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Not save the input value to Redux store or database
  };

  return (
    <>
      <h3>Routine</h3>
      <RoutineWrapper>
        <RoutineGoalInputWrapper>
          <RoutineGoalInput
            type="text"
            placeholder="루틴을 통해 형성하고자 하는 Core 인식을 작성해주세요!"
            value={goalInputValue}
            disabled={!isEditing}
            onChange={(e) => setGoalInputValue(e.target.value)}
          />
          {!isEditing ? (
            <RoutineEditButton onClick={handleEditClick}>
              <AiOutlineEdit />
            </RoutineEditButton>
          ) : (
            <RoutineSaveButton onClick={handleSaveClick}>
              <AiOutlineCheckSquare />
            </RoutineSaveButton>
          )}
        </RoutineGoalInputWrapper>
        <RoutineList />
      </RoutineWrapper>
    </>
  );
};

export default RoutinePage;

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { updateRoutine, deleteRoutine } from "../reducer/Controller";
import { useState } from "react";

const RoutineListWrapper = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 10px;
  `;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  ${(props) =>
    props.checked &&
    `
      text-decoration: line-through;
      color: gray;
    `}
`;

const Time = styled.div`
  ${(props) =>
    props.checked &&
    `
      text-decoration: line-through;
      color: gray;
    `}
`;

const Check = styled.input`
all: unset;
  float: right;
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:checked {
    background-color: #ccc;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  &:checked:after {
    display: block;
    width: 8px;
    height: 14px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) translate(-4px, 5px);
  }
`;

const EditBtn = styled.button`
margin-top: 10px;
  color: #444444;
  background: #ffffff;
  border: 1px #dadada solid;
  padding: 5px 10px;
  border-radius: 2px;
  font-weight: bold;
  font-size: 9pt;
  outline: none;
  :hover {
    border: 1px #c6c6c6 solid;
    box-shadow: 1px 1px 1px #eaeaea;
    color: #333333;
    background: #f7f7f7;
  }
  :active {
    box-shadow: inset 1px 1px 1px #dfdfdf;
  }
`;

const DeleteBtn = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  color: #444444;
  background: #ffffff;
  border: 1px #dadada solid;
  padding: 5px 10px;
  border-radius: 2px;
  font-weight: bold;
  font-size: 9pt;
  outline: none;
  :hover {
    border: 1px #c6c6c6 solid;
    box-shadow: 1px 1px 1px #eaeaea;
    color: #333333;
    background: #f7f7f7;
  }
  :active {
    box-shadow: inset 1px 1px 1px #dfdfdf;
  }
`;

const RoutineList = () => {
  const dispatch = useDispatch();
  const routineList = useSelector((state) => state.add.routines);

  return (
    <>
      {routineList.map((routine) => (
        <RoutineListItem
          key={routine.id}
          routine={routine}
          dispatch={dispatch}
        />
      ))}
    </>
  );
};

const RoutineListItem = ({ routine, dispatch }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [checked, setChecked] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setEditedTitle(routine.title);
    setEditedTime(routine.time);
  };

  const handleUpdate = () => {
    dispatch(
      updateRoutine({ id: routine.id, title: editedTitle, time: editedTime })
    );
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteRoutine({ id: routine.id }));
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <RoutineListWrapper>
        <ContentWrapper>
          <Title checked={checked}>
            {editMode ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              routine.title
            )}
          </Title>

          <Time checked={checked}>
            {editMode ? (
              <input
                type="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
              />
            ) : (
              routine.time
            )}
          </Time>
          <EditBtn onClick={editMode ? handleUpdate : handleEdit}>
            {editMode ? "Update" : "Edit"}
          </EditBtn>
          <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
        </ContentWrapper>
        <Check type="checkbox" checked={checked} onChange={handleCheck} />
      </RoutineListWrapper>
    </>
  );
};
export default RoutineList;

import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, deleteTodo } from "../reducer/Controller";

const TodoListWrapper = styled.div`
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

const Date = styled.div`
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

const CheckWapper = styled.div`
  width: 100%;
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
  /* all: unset; */
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

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.add.todos);

  return (
    <>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  );
};

const TodoListItem = ({ todo, dispatch }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [checked, setChecked] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setEditedTitle(todo.title);
    setEditedDate(todo.date);
    setEditedTime(todo.time);
  };

  const handleUpdate = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        title: editedTitle,
        date: editedDate,
        time: editedTime,
      })
    );
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteTodo({
        id: todo.id,
      })
    );
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <TodoListWrapper>
      <ContentWrapper>
        <Title checked={checked}>
          {editMode ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            todo.title
          )}
        </Title>
        <Date checked={checked}>
          {editMode ? (
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          ) : (
            todo.date
          )}
        </Date>
        <Time checked={checked}>
          {editMode ? (
            <input
              type="time"
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
            />
          ) : (
            todo.time
          )}
        </Time>
        <EditBtn onClick={editMode ? handleUpdate : handleEdit}>
          {editMode ? "Save" : "Edit"}
        </EditBtn>
        <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
      </ContentWrapper>
      <CheckWapper>
        <Check type="checkbox" onChange={handleCheck} checked={checked} />
      </CheckWapper>
    </TodoListWrapper>
  );
};

export default TodoList;
import TodoList from "../components/TodoList";
import RoutineList from "../components/RoutineList";
import styled from "styled-components";

const DashBoardWrapper = styled.div``;

const DashBoard = () => {
  return (
    <DashBoardWrapper>
      <h2>Routine</h2>
      <RoutineList />
      <h2>To do</h2>
      <TodoList />
    </DashBoardWrapper>
  );
};

export default DashBoard;
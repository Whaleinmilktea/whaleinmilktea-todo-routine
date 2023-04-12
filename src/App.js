import "./App.css";
import styled from "styled-components";
import Addform from "./components/Addform";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import TodoPage from "./pages/Todo";
import RoutinePage from "./pages/Routine";
import Weather from "./pages/Weather";

const AppWrapper = styled.div`
  width: 400px;
  height: 700px;
  background-color: #fff;
  border-radius: 5px;
`;

const NavList = styled.ul`
  display: flex;
  font: 300;
  justify-content: space-between;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <nav>
          <NavList>
            <NavItem>
              <NavLink to="/">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/todo">Todo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/routine">Routine</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/weather">Weather</NavLink>
            </NavItem>
          </NavList>
        </nav>
        <Addform />
        <Routes>
          <Route exact path="/" element={<DashBoard />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;

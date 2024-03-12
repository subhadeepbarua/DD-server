import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EmployeeEdit from './components/EmployeeEdit';
import UserContextProvider from './components/context/UserContextProvider';
import './style.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/Home"
          element={
            <div className="flex flex-col">
              <Navbar />
              <DashBoard />
            </div>
          }
        />
        <Route
          path="/EmployeeList"
          element={
            <UserContextProvider>
              <div className="flex flex-col">
                <Navbar />
                <EmployeeList />
              </div>
            </UserContextProvider>
          }
        />
        <Route
          path="/CreateEmployee"
          element={
            <div className="flex flex-col">
              <Navbar />
              <CreateEmployee />
            </div>
          }
        />
        <Route
          path="/EmployeeEdit"
          element={
            <UserContextProvider>
              <div className="flex flex-col">
                <Navbar />
                <EmployeeEdit />
              </div>
            </UserContextProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

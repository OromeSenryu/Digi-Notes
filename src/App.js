import './App.css';
import { Router, Routes, Route, } from "react-router-dom";
import LoginOptions from './Components/LoginOptions';
import UserLogin from './Components/UserLogin';
import Register from './Components/Register';
import DashboardNotes from './Components/DashboardNotes';
import EditNotes from './Components/EditNotes';




function App() {
  return (
    <div className="App">
      
      <Routes>
         <Route path="/" element={<LoginOptions />} />
         <Route path="/register" element={<Register />} />
         <Route path="/userLogin" element={<UserLogin />} />
         <Route path="/dashboardNotes" element={<DashboardNotes />} />
         <Route path="/editNotes" element={<EditNotes />} />
      </Routes>

    </div>
  );
}

export default App;

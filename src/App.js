import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import EmployeeList from './pages/employee-list';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const App = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EmployeeList />} />


        

      </Routes>
      
    </Router>
    </>
  );
}

export default App;

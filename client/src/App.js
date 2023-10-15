import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CreateForm from './Components/CreateForm';
import Settings from './Components/Settings';
import Invite from './Components/Invite';
import CreateAccount from './Components/CreateAccount/CreateAccount.js';
import Login from './Components/Login/Login.js';
import EmployeeForm from './Components/EmployeeForm.js';
import SpecificForm from './Components/SpecificForm';
import ViewForms from './Components/ViewForms';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element = {<Login />}></Route>
          <Route path="/createform" element = {<CreateForm />}></Route>
          <Route path="/viewform" element = {<ViewForms />}></Route>
          <Route path="/specificform" element = {<SpecificForm />}></Route>
          <Route path="/settings" element = {<Settings />}></Route>
          <Route path="/invite" element = {<Invite />}></Route>
          <Route path="/createacct" element = {<CreateAccount />}></Route>
          <Route path="/dashboard" element = {<Dashboard />}></Route>
          <Route path="/employee/:formID/:employeeID" element = {<EmployeeForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

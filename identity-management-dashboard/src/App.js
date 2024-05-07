import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ManageRoles from "./components/ManageRoles";
import ManageUsers from "./components/ManageUsers";
import DelegateRoles from "./components/DelegateRoles";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>User and Role Management System</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/manage-roles">Manage Roles</Link>
              </li>
              <li>
                <Link to="/manage-users">Manage Users</Link>
              </li>
              <li>
                <Link to="/delegate-roles">Delegate Roles</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/manage-roles" component={ManageRoles} />
            <Route path="/manage-users" component={ManageUsers} />
            <Route path="/delegate-roles" component={DelegateRoles} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

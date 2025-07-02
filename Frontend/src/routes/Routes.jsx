import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Signup from '../auth/Signup.jsx';
import Login from '../auth/Login.jsx';
import Todo from '../todo/todo.jsx';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </RouterRoutes>
  );
};

export default Routes;

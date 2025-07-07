
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Todo from '../todo/Todo';
import Login from '../auth/Login';
import PageNotFound from '../todo/Notfound,';
import Signup from '../auth/Signup';


const AppRoutes = () => {
  const token = localStorage.getItem("jwt");

  return ( 
    <Routes>
      <Route
        path="/"
        element={token ? <Todo/> :<Navigate to="/login" />}
      />
      <Route path="/signup" element={ <Signup/> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/todo" element={ <Todo /> } />
      <Route path="*" element={ <PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;

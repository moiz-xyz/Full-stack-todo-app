
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Todo from '../todo/Todo';
import Login from '../auth/Login';
import PageNotFound from '../todo/Notfound,';
import Signup from '../auth/Signup';
import ForgotPassword from '../auth/forgotPassword';
import Resetpassword from '../auth/Resetpassword';
import VerifyOtp from '../auth/verifyotp';


const AppRoutes = () => {
  const token = localStorage.getItem("authToken");

  return ( 
    <Routes>
      <Route
        path="/"
        element={token ? <Todo/> :<Navigate to="/login" />}
      />
      <Route path="/signup" element={ <Signup/> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/forgotPassword" element={ <ForgotPassword /> } />
      <Route path="/verifyOtp" element={ <VerifyOtp/> } />
      <Route path="/resetPassword" element={ <Resetpassword /> } />

      <Route path="/todo" element={ <Todo /> } />
      <Route path="*" element={ <PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;

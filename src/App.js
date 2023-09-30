import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginIn from './components/LoginIn';
import UserList from './components/UserList';
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loan from './components/Loan';

function App() {

  const user = false;
  // const navigate = useNavigate();

  // const redirectTo = () => {
  //   navigate('/login');
  // }
  // useEffect(() => {
  //   redirectTo()
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/login' element={<LoginIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-list' element={<UserList />} />
          <Route path='/loan-page' element={<Loan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

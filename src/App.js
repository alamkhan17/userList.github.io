import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginIn from './components/LoginIn';
import UserList from './components/UserList';
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const user = false;

  // useEffect(() => {
  //   if (user === false) {
  //     return <Navigate replace to="/login" />;
  //   }
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/login' element={<LoginIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-list' element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

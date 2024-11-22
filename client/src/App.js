import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { userActions } from './store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJWToken } from './utils/helperFunc';
import NavBar from './components/NavBar/NavBar';

// Lazy-loaded components
const Form = lazy(() => import('./pages/Forms/Forms'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const FormEditor = lazy(() => import('./pages/FormEditor/FormEditor'));
const SingleForm = lazy(() => import('./pages/SingleForm/SingleForm'));

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const userDoc = decodeJWToken(token);
        dispatch(userActions.login({ user: userDoc }));
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
  }, [token, dispatch]);

  const user = useSelector((state) => state.userLog.user);

  // Define routes based on user login status
  const publicRoutes = [
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
  ];

  const privateRoutes = [
    { path: '/', element: <Form /> },
    { path: '/formBuilder', element: <FormEditor /> },
    { path: '/form/:id', element: <SingleForm /> },
  ];

  console.log(user);
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        {/* <CssBaseline /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Render public or private routes based on the user's login status */}
              {(user ? privateRoutes : publicRoutes).map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

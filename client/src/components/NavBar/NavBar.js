import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { userActions } from '../../store/userSlice';
import useAppNavigate from '../../utils/useAppNavigation';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function NavBar() {
  const dispatch = useDispatch();
  const navigate = useAppNavigate();
  const user = useSelector((state) => state.userLog.user);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
    let token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      // redirect to '/login' here
      navigate('/login');
    }
  };


  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          {!user ? (
              <>
                <Link to={'/login'}>Login / Signup</Link>
              </>
            ) : (
              <Button color="inherit" onClick={logoutHandler} sx={{
                textTransform: 'none'
              }}>Logout</Button>
            )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default NavBar;
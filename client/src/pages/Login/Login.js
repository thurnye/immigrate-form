import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { userActions } from '../../store/userSlice';
import services from '../../utils/services';
import {decodeJWToken} from '../../utils/helperFunc'

const Copyright = lazy(() => import('../../components/copyright/copyright'));



const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      

      const data = new FormData(event.currentTarget);
      const loginData = {
        email: data.get('email'),
        password: data.get('password'),
      };
      const result = await services.postLogin(loginData);
      let token = result.data;
      localStorage.setItem('token', token);
      const userDoc = decodeJWToken(token);
      dispatch(
        userActions.login({
          user: userDoc,
        })
      );
      navigate('/');
    } catch (error) {
      console.log('ERROR:::', error);
      const errMsg = error.response?.data;
      
    }
  };

  return (
    <div className={styles.Login}>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* Sign up with Google */}
              <Box sx={{mb:3}}>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width='100%'
                  my={2}
                >
                  <Box flexGrow={1} borderBottom='1px solid #cecece' />
                  <Typography variant='body2' mx={2} color='text.secondary'>
                    or
                  </Typography>
                  <Box flexGrow={1} borderBottom='1px solid #cecece' />
                </Box>
              </Box>

              <Grid container>
                <Grid item xs>
                  <Link href='/forgotPassword' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Suspense fallback={<div></div>}>
                <Copyright sx={{ mt: 5 }} />
            </Suspense>

        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;

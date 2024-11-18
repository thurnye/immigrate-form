import React from 'react';
import styles from './copyright.module.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const Copyright = (props) => (
  <div className={styles.copyright}>
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='/'>
       Form Builder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  </div>
);


export default Copyright;

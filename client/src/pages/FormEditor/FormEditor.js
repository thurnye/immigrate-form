import React from 'react';
import styles from './FormEditor.module.css';
import FormComponents from '../../components/FormComponents/FormComponents';
import { Box } from '@mui/material';



const FormEditor = () => (
  <Box className={styles.FormEditor} sx={{mt: 4}}>
    <FormComponents/>
  </Box>
);


export default FormEditor;

import React from 'react';
import styles from './FormEditor.module.css';
import FormComponents from '../../components/FormComponents/FormComponents';
import { Box } from '@mui/material';



const FormEditor = () => (
  <Box className={styles.FormEditor}>
    <FormComponents/>
  </Box>
);


export default FormEditor;

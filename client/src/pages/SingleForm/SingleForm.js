import React, { useState, useEffect } from 'react';
import styles from './SingleForm.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import services from '../../utils/services';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const SingleForm = () => {
  const { id } = useParams();
  console.log('ID', id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the form data when the component mounts or `id` changes
  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error

        const response = await services.getFormById(id); // Replace with your actual API call
        setFormData(response.data); // Set form data
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch form data'); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchForm();
  }, [id]);

  // Render logic
  if (loading) {
    return (
      <Box
        className={styles.SingleForm}
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className={styles.SingleForm}
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    );
  }


  return (
    <Box className={styles.SingleForm} p={3}>
      <Typography variant='h4' gutterBottom>
        {formData?.formName}
      </Typography>
      <Typography variant='body1' gutterBottom>
        ID: {id}
      </Typography>
      <Typography variant='h6' mt={3}>
        Fields:
      </Typography>
      {formData.formData?.map((item) => (
        <Box>
          <Typography variant='body1'>
            <strong>{item.label}</strong> ({item.type})
          </Typography>

        {/* checkbox */}
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Label'
          />
        </Box>

        {/* TextBox  and textArea*/}
        <Box>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>


        {/* Dropdown*/}
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>


        {/* Radio*/}
        <Box>
        <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
        </Box>


        </Box>
      ))}
    </Box>
  );
};

export default SingleForm;

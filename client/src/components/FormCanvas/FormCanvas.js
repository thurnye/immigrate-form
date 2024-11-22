import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import Attributes from './Attributes';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRandomInt } from '../../utils/helperFunc';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const FormCanvas = forwardRef(({ formElements, updateElement, removeElement }, ref) => {
  const [validationErrors, setValidationErrors] = useState({});

  // Expose the validateForm function to the parent via the ref
  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const errors = {};

      formElements.forEach((field, index) => {
        if (!field.fieldName.trim()) {
          errors[index] = 'Field Name is required.';
        }
        if (!field.label.trim()) {
          errors[index] = 'Label is required.';
        }
        if (
          field.type === 'dropdown' &&
          (!field.options || field.options.length === 0)
        ) {
          errors[index] = 'At least one option is required for dropdown fields.';
        }
      });

      setValidationErrors(errors);
      return Object.keys(errors).length === 0; 
    },
  }));

  const addOption = (index) => {
    console.log(formElements, index)
    const updatedOptions = [
      ...(formElements[index].options || []),
      `Option ${formElements[index].options.length + 1}`,
    ];
    updateElement(index, 'options', updatedOptions);
  };

  const removeOption = (index, optionIndex) => {
    const updatedOptions = [...formElements[index].options];
    updatedOptions.splice(optionIndex, 1);
    updateElement(index, 'options', updatedOptions);
  };


  

  return (
    <Droppable droppableId='canvas'>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          flex='3'
          ml={2}
          border='1px solid #ddd'
          p={2}
          borderRadius='4px'
          minHeight='300px'
          sx={{
            maxWidth: 900,
            m: 'auto',
          }}
        >
          <Typography variant='h6' mb={2}>
            Form Canvas
          </Typography>
          {formElements.map((item, index) => (
            <Box
              key={item.id}
              mb={2}
              p={2}
              bgcolor='#f9f9f9'
              borderRadius='4px'
              border='1px solid #ddd'
              sx={{
                maxWidth: 500,
                m: 'auto',
                my: 3,
                position: 'relative'
              }}
            >
              <Box sx={{
                position: 'absolute',
                 top: 0,
                 right: 0

              }}>
              <IconButton
                  aria-label='delete'
                  color='error'
                  onClick={() => removeElement(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant='body1' mb={1}>
                {item.name}
              </Typography>

              <Box sx={{ my: 2 }}>
                <TextField
                  fullWidth
                  placeholder='Field Name'
                  value={item.fieldName}
                  onChange={(e) =>
                    updateElement(index, 'fieldName', e.target.value)
                  }
                  error={!!validationErrors[index]}
                  helperText={validationErrors[index]}
                />
              </Box>
              {(item.type === 'radio' || item.type === 'checkbox') && (<Box>
                <FormControlLabel control={<Checkbox checked={item.isGrouped}  onChange={(e) =>
                      updateElement(index, 'isGrouped', e.target.checked)
                    }/>} label="Group items" />
                     <>
                  {item.isGrouped && <>
                    <Box mt={2} sx={{ textAlign: 'end' }}>
                      <Button
                        variant='text'
                        size='small'
                        onClick={() => addOption(index)}
                        sx={{
                          textTransform: 'none',
                        }}
                      >
                        {`Add ${item.type} labels`}
                      </Button>
                    </Box>
                    <Box sx={{ mx: 2 }}>
                      {item.options?.map((option, i) => (
                        <Box
                          key={getRandomInt()}
                          display='flex'
                          alignItems='center'
                          mt={1}
                        >
                          <TextField
                            value={option}
                            onChange={(e) => {
                              const updatedOptions = [...item.options];
                              updatedOptions[i] = e.target.value;
                              updateElement(index, 'options', updatedOptions);
                            }}
                            sx={{ width: '70%' }}
                            size='small'
                          />
                          <Box>
                            <IconButton
                              aria-label='delete'
                              color='error'
                              onClick={() => removeOption(index, i)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    {validationErrors[index] ===
                      'At least one option is required for dropdown fields.' && (
                      <Typography color='error' variant='caption'>
                        At least one option is required.
                      </Typography>
                    )}
                  </>}
                </>
              </Box>)}



              {item.type === 'dropdown' && (
                <>
                  <Select
                    fullWidth
                    value={item.options?.[0] || ''}
                    onChange={(e) =>
                      updateElement(index, 'options', e.target.value)
                    }
                  >
                    {item.options.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box mt={2} sx={{ textAlign: 'end' }}>
                    <Button
                      variant='text'
                      size='small'
                      onClick={() => addOption(index)}
                      sx={{
                        textTransform: 'none',
                      }}
                    >
                      Add Options
                    </Button>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    {item.options.map((option, i) => (
                      <Box
                        key={getRandomInt()}
                        display='flex'
                        alignItems='center'
                        mt={1}
                      >
                        <TextField
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...item.options];
                            updatedOptions[i] = e.target.value;
                            updateElement(index, 'options', updatedOptions);
                          }}
                          sx={{ width: '70%' }}
                          size='small'
                        />
                        <Box>
                          <IconButton
                            aria-label='delete'
                            color='error'
                            onClick={() => removeOption(index, i)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  {validationErrors[index] ===
                    'At least one option is required for dropdown fields.' && (
                    <Typography color='error' variant='caption'>
                      At least one option is required.
                    </Typography>
                  )}
                </>
              )}

              {item.type === 'date' && <TextField type='date' fullWidth />}

              <Box mt={2}>
                <TextField
                  fullWidth
                  label='Label'
                  value={item.label}
                  placeholder='Display Name'
                  onChange={(e) =>
                    updateElement(index, 'label', e.target.value)
                  }
                  error={
                    validationErrors[index] === 'Label is required.' &&
                    !item.label.trim()
                  }
                  helperText={
                    validationErrors[index] === 'Label is required.'
                      ? 'Label is required.'
                      : ''
                  }
                />
              </Box>

              <Box mt={2} display='flex' alignItems='center'>
                <Attributes
                  isPlaceholderAvailable={item.type === 'inputs'}
                  onAttributesChange={(attributes) =>
                    updateElement(index, 'attributes', attributes)
                  }
                  itemType={item.type}
                />
              </Box>
            </Box>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
});

export default FormCanvas;

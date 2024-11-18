import React from 'react';
import { Box, Typography, TextField, Checkbox, MenuItem, Select, Button, FormControl } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import InputLabel from '@mui/material/InputLabel';

const FormCanvas = ({ formElements, updateElement }) => {
 

  const addOption = (index) => {
    const updatedOptions = [...(formElements[index].options || []), `Option ${formElements[index].options.length + 1}`];
    updateElement(index, 'options', updatedOptions);
  };

  const removeOption = (index, optionIndex) => {
    const updatedOptions = [...formElements[index].options];
    updatedOptions.splice(optionIndex, 1);
    updateElement(index, 'options', updatedOptions);
  };

  const validateField = (field) => {
    if (field.required && !field.label.trim()) {
      return 'Label is required.';
    }
    if (field.required && field.type === 'text' && !field.placeholder.trim()) {
      return 'Placeholder is required.';
    }
    if (field.required && (field.type === 'dropdown' || field.type === 'radio') && (!field.options || field.options.length === 0)) {
      return 'At least one option is required.';
    }
    return '';
  };

  return (
    <Droppable droppableId="canvas">
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          flex="3"
          ml={2}
          border="1px solid #ddd"
          p={2}
          borderRadius="4px"
          minHeight="300px"
        >
          <Typography variant="h6" mb={2}>Form Canvas</Typography>
          {formElements.map((item, index) => (
            <Box
              key={item.id}
              mb={2}
              p={2}
              bgcolor="#f9f9f9"
              borderRadius="4px"
              border="1px solid #ddd"
            >
              <Typography variant="body1" mb={1}>{item.label}</Typography>

              {item.type === 'text' && (
                <TextField
                  fullWidth
                  placeholder={item.placeholder || 'Enter text'}
                  value={item.placeholder}
                  onChange={(e) => updateElement(index, 'placeholder', e.target.value)}
                  error={!!validateField(item)}
                  helperText={validateField(item)}
                />
              )}

              {item.type === 'checkbox' && (
                <Checkbox
                  checked={item.required}
                  onChange={(e) => updateElement(index, 'required', e.target.checked)}
                />
              )}

              {item.type === 'dropdown' && (
                <>
                  <Select
                    fullWidth
                    value={item.options?.[0] || ''}
                    onChange={(e) => updateElement(index, 'options', e.target.value)}
                  >
                    {item.options.map((option, i) => (
                      <MenuItem key={i} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => addOption(index)}
                    >
                      Add Option
                    </Button>
                  </Box>
                  <Box>
                    {item.options.map((option, i) => (
                      <Box key={i} display="flex" alignItems="center" mt={1}>
                        <TextField
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...item.options];
                            updatedOptions[i] = e.target.value;
                            updateElement(index, 'options', updatedOptions);
                          }}
                        />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeOption(index, i)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {item.type === 'date' && <TextField type="date" fullWidth />}

              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Label"
                  value={item.label}
                  onChange={(e) => updateElement(index, 'label', e.target.value)}
                  error={!!validateField(item)}
                  helperText={validateField(item)}
                />
              </Box>

              <Box mt={2} display="flex" alignItems="center">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Required</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={item.required}
                    label="Required"
                    onChange={(e) => updateElement(index, 'required', e.target.checked)}
                  >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value={'true'}>false</MenuItem>
                    <MenuItem value={'false'}>true</MenuItem>
                  </Select>
    </FormControl>
              </Box>
            </Box>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default FormCanvas;

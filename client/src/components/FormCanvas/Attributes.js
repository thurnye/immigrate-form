import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DropDownSelect from '../DropDownSelect/DropDownSelect';

export default function Attributes({
  isPlaceholderAvailable,
  onAttributesChange,
  itemType
}) {
  const [state, setState] = React.useState({
    placeholder: false,
    required: false,
    placeholderText: '',
    type: '', // State for the 'Type' dropdown
    elementType: '', // State for the 'Element Type' dropdown
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setState((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: checked,
        ...(name === 'placeholder' && !checked ? { placeholderText: '' } : {}),
      };
      onAttributesChange(updatedState); // Notify the parent of changes
      return updatedState;
    });
  };

  const handlePlaceholderTextChange = (event) => {
    const updatedState = {
      ...state,
      placeholderText: event.target.value,
    };
    setState(updatedState);
    onAttributesChange(updatedState);
  };

  const handleSelectChange = (field, value) => {
    const updatedState = {
      ...state,
      [field]: value,
    };
    setState(updatedState);
    onAttributesChange(updatedState); // Notify the parent of changes
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormGroup>
        <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
            {itemType === 'inputs' && <>
                <DropDownSelect
                options={['text', 'number']}
                label={'Type'}
                onSelect={(selectedOption) =>
                    handleSelectChange('type', selectedOption)
                }
                />

                <DropDownSelect
                options={['input', 'text area']}
                label={'Element Type'}
                onSelect={(selectedOption) =>
                    handleSelectChange('elementType', selectedOption)
                }
                />
            </>}
            
            <FormControlLabel
            control={
                <Checkbox
                name='placeholder'
                checked={state.placeholder}
                onChange={handleChange}
                disabled={!isPlaceholderAvailable}
                />
            }
            label='Placeholder'
            />
            <FormControlLabel
            control={
                <Checkbox
                name='required'
                checked={state.required}
                onChange={handleChange}
                />
            }
            label='Required'
            />

        </Box>
        {state.placeholder && (
          <TextField
            label='Placeholder Text'
            value={state.placeholderText}
            onChange={handlePlaceholderTextChange}
            fullWidth
            margin='normal'
          />
        )}
      </FormGroup>
    </Box>
  );
}

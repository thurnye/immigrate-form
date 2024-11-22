import React, { useRef, useState } from 'react';
import styles from './FormComponents.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import FormLists from '../FormLists/FormLists';
import FormCanvas from '../FormCanvas/FormCanvas';
import { DragDropContext } from 'react-beautiful-dnd';
import { formComponents } from './formItems';
import { Button, TextField, Typography } from '@mui/material';
import services from '../../utils/services';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

export default function FormComponents() {
  const [formElements, setFormElements] = useState([]);
  const [formName, setFormName] = useState('');
  const [formNameError, setFormNameError] = useState(''); // State for form name error
  const user = useSelector((state) => state.userLog?.user?.user);

  const canvasRef = useRef();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === 'toolbox' &&
      destination.droppableId === 'canvas'
    ) {
      const newElement = formComponents.find((item) => item.id === draggableId);
      if (newElement) {
        setFormElements((prev) => [
          ...prev,
          {
            ...newElement,
            id: `${newElement.id}-${Date.now()}`,
            options:
              newElement.type === 'dropdown' || newElement.type === 'radio' || newElement.type === 'checkbox'
                ? []
                : undefined,
            validationMessage: '',
          },
        ]);
      }
    }
  };

  const updateElement = (index, key, value) => {
    const updatedElements = [...formElements];
    updatedElements[index][key] = value;
    setFormElements(updatedElements);
  };

  const removeElement = (index) => {
    const updatedElements = [...formElements];
    updatedElements.splice(index, 1); // Remove the element at the given index
    setFormElements(updatedElements); // Update the state
  };

  const handleSubmit = async () => {
    // Validate form name
    if (!formName.trim()) {
      setFormNameError('Form Name is required.');
      return;
    }

    // Clear form name error
    setFormNameError('');

    // Validate form elements
    if (canvasRef.current?.validateForm()) {
      try {
        const result = await services.postSaveForm({
          userId: user._id,
          formName,
          formData: formElements,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }} className={styles.FormComponents}>
      <CssBaseline />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'absolute',
              height: '90vh',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar />
          <FormLists formComponents={formComponents} />
        </Drawer>

        <Box
          component='main'
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ width: '100%', mb: 2 }}>
            <TextField
              id='outlined-basic'
              label='Form Name'
              variant='outlined'
              fullWidth
              value={formName}
              onChange={(event) => setFormName(event.target.value)}
              error={!!formNameError}
              helperText={formNameError}
              required
            />
          </Box>
          <Box sx={{ textAlign: 'end' }}>
            <Button
              onClick={handleSubmit}
              disabled={formElements.length === 0} // Disable button if no form elements
              variant='text'
              color='primary'
            >
              Save
            </Button>
          </Box>
          <Box sx={{ height: '70vh', overflow: 'auto', py: 1 }}>
            <FormCanvas
              ref={canvasRef}
              formElements={formElements}
              updateElement={updateElement}
              removeElement={removeElement}
            />
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
}

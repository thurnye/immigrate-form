import React, { useRef } from 'react';
import styles from './FormComponents.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import FormLists from '../FormLists/FormLists';
import FormCanvas from '../FormCanvas/FormCanvas';
import { DragDropContext } from 'react-beautiful-dnd';
import { formComponents } from './formItems';
import { Button } from '@mui/material';
import services from '../../utils/services';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

export default function FormComponents() {
  const [formElements, setFormElements] = React.useState([]);
  const [formName, setFormName] = React.useState('');
  const user = useSelector((state) => state.userLog?.user?.user);

  const canvasRef = useRef();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Dragging from toolbox to canvas
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
              newElement.type === 'dropdown' || newElement.type === 'radio'
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

    // Update validation message if required
    if (key === 'required' || key === 'placeholder' || key === 'label') {
      const element = updatedElements[index];
      if (element.required) {
        console.log(element);
        element.required = !element.required;
        // element.validationMessage = validateField(element);
      }
    }

    setFormElements(updatedElements);
  };

  const handleSubmit = async () => {
    if (canvasRef.current?.validateForm()) {
      try {
        // console.log({
        //   userId: user._id,
        //   formName,
        //   formData: formElements,
        // });
        const result = await services.postSaveForm({
          userId : user._id,
          formName,
          formData: formElements
        });
        console.log(result)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }} className={styles.FormComponents}>
      <CssBaseline />
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Toolbox Drawer */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar />
          <FormLists formComponents={formComponents} />
        </Drawer>

        {/* Main Canvas Area */}
        <Box
          component='main'
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ width: '100%' }}>
            <TextField
              id='outlined-basic'
              label='Form Name'
              variant='outlined'
              fullWidth
              value={formName}
              onChange={(event) => {
                setFormName(event.target.value);
              }}
            />
          </Box>
          <Box sx={{ textAlign: 'end' }}>
            <Button onClick={() => handleSubmit()}>Save</Button>
          </Box>
          <Box>
            <FormCanvas
              ref={canvasRef}
              formElements={formElements}
              updateElement={updateElement}
            />
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
}

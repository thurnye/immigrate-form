import * as React from 'react';
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
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Dragging from toolbox to canvas
    if (source.droppableId === 'toolbox' && destination.droppableId === 'canvas') {
      const newElement = formComponents.find((item) => item.id === draggableId);
      if (newElement) {
        setFormElements((prev) => [
          ...prev,
          {
            ...newElement,
            id: `${newElement.id}-${Date.now()}`,
            placeholder: newElement.type === 'text' ? '' : undefined,
            options: newElement.type === 'dropdown' || newElement.type === 'radio' ? [] : undefined,
            required: false, // Default to not required when added to the canvas
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
        console.log(element)
        element.required = !element.required
        // element.validationMessage = validateField(element);
      }
    }

    setFormElements(updatedElements);
  };

  const handleSubmit = async () => {
    try {
      const result = await services.postSaveForm({
        userId : user._id,
        formName, 
        formData: formElements
      });

      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }


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
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <FormLists formComponents={formComponents} />
        </Drawer>

        {/* Main Canvas Area */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{width: '100%'}}>
          <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth
          value={formName}
          onChange={(event) => {
            setFormName(event.target.value);
          }}/>
          </Box>
          <Box sx={{textAlign: 'end'}}>
            <Button onClick={() => handleSubmit()}>Save</Button>

          </Box>
          <Box>
                <FormCanvas formElements={formElements} updateElement={updateElement} />
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
}

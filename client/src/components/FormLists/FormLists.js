import React from 'react';
import { Box, Typography } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const FormLists = ({ formComponents }) => {
  return (
    <Droppable droppableId="toolbox" isDropDisabled={false}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          flex="1"
          p={2}
        >
          <Typography variant="h6" mb={2}>Toolbox</Typography>
          {formComponents.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  p={1}
                  mb={1}
                  bgcolor="#f4f4f4"
                  borderRadius="4px"
                  textAlign="center"
                  sx={{ cursor: 'grab' }}
                >
                  {item.name}
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default FormLists;

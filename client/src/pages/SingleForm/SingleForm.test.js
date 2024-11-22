import React from 'react';
import ReactDOM from 'react-dom';
import SingleForm from './SingleForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SingleForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import FormEditor from './FormEditor';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
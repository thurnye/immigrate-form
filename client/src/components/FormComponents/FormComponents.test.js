import React from 'react';
import ReactDOM from 'react-dom';
import FormComponents from './FormComponents';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormComponents />, div);
  ReactDOM.unmountComponentAtNode(div);
});
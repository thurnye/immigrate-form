import React from 'react';
import ReactDOM from 'react-dom';
import FormCanvas from './FormCanvas';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormCanvas />, div);
  ReactDOM.unmountComponentAtNode(div);
});
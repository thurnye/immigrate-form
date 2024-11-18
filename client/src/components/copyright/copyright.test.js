import React from 'react';
import ReactDOM from 'react-dom';
import copyright from './copyright';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<copyright />, div);
  ReactDOM.unmountComponentAtNode(div);
});
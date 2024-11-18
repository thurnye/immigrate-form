import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './Forms';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Forms />, div);
  ReactDOM.unmountComponentAtNode(div);
});
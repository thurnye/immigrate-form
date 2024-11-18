import React from 'react';
import ReactDOM from 'react-dom';
import FormLists from './FormLists';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormLists />, div);
  ReactDOM.unmountComponentAtNode(div);
});
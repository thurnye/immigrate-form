import React from 'react';
import ReactDOM from 'react-dom';
import DropDownSelect from './DropDownSelect';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DropDownSelect />, div);
  ReactDOM.unmountComponentAtNode(div);
});
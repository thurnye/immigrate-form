import React from 'react';
import ReactDOM from 'react-dom';
import CardListItem from './CardListItem';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
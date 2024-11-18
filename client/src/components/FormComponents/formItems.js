import { getRandomInt } from "../../utils/helperFunc";

export const formComponents = [
  {
    id: getRandomInt().toString(),
    name: 'Text Input',
    type: 'text',
    label: 'Text Input',
    placeholder: '',
    required:' false',
    options: undefined,
  },
  {
    id: getRandomInt().toString(),
    name: 'Checkbox',
    type: 'checkbox',
    label: 'Checkbox',
    placeholder: undefined,
    required:' false',
    options: undefined,
  },
  {
    id: getRandomInt().toString(),
    name: 'Dropdown',
    type: 'dropdown',
    label: 'Dropdown',
    placeholder: '',
    required:' false',
    options: [],
  },
  {
    id: getRandomInt().toString(),
    name: 'Radio Buttons',
    type: 'radio',
    label: 'Radio Buttons',
    placeholder: '',
    required:' false',
    options: [],
  },
  {
    id: getRandomInt().toString(),
    name: 'Date Picker',
    type: 'date',
    label: 'Date Picker',
    placeholder: '',
    required:' false',
    options: undefined,
  },
];

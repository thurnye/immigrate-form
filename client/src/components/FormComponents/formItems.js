import { getRandomInt } from "../../utils/helperFunc";

export const formComponents = [
  {
    id: getRandomInt().toString(),
    name: 'Text Input',
    fieldName: '',
    type: 'inputs',
    label: 'Text Input',
    isPlaceholderAvailable: true,
    attributes: {
      placeholder: true,
      required: true,
      placeholderText: "",
      type: "text",
      elementType: "input"
  }
  },
  {
    id: getRandomInt().toString(),
    name: 'Checkbox',
    fieldName: '',
    type: 'checkbox',
    label: 'Checkbox',
    isPlaceholderAvailable: false,
    options: [],
    isGrouped: false
  },
  {
    id: getRandomInt().toString(),
    name: 'Dropdown',
    fieldName: '',
    type: 'dropdown',
    label: 'Dropdown',
    isPlaceholderAvailable: false,
    options: [],
  },
  {
    id: getRandomInt().toString(),
    name: 'Radio Buttons',
    fieldName: '',
    type: 'radio',
    label: 'Radio Buttons',
    isPlaceholderAvailable: false,
    options: [],
    isGrouped: false
  },
  {
    id: getRandomInt().toString(),
    name: 'Date Picker',
    fieldName: '',
    type: 'date',
    label: 'Date Picker',
    isPlaceholderAvailable: false,
  },
];

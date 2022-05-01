import { createAction } from '@reduxjs/toolkit';

const filterContact = createAction('contacts/filter');
const actions = { filterContact };

export default actions;

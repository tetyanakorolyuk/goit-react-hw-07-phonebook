import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './contacts/contactsSlice';
import contactsReducer from './contacts/reducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    ],
});

setupListeners(store.dispatch);

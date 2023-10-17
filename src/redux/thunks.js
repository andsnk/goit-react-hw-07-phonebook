import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContactsApi, addContactApi, deleteContactApi } from 'api/api';
import Notiflix from 'notiflix';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContactsApi();
      Notiflix.Notify.info(`You have ${data.length} contacts`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ status: 404, message: '404: Not Found' });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const data = await addContactApi(contact);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ status: 404, message: '404: Not Found' });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const data = await deleteContactApi(contactId);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ status: 404, message: '404: Not Found' });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

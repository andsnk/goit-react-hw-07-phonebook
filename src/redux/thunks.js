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
      Notiflix.Notify.failure(error.message);
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const data = await addContactApi(contact);
      Notiflix.Notify.success(`${data.name} added to your contacts.`);
      return data;
    } catch (error) {
      Notiflix.Notify.failure(error.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const data = await deleteContactApi(contactId);
      Notiflix.Notify.warning(`Contact ${data.name} has been deleted.`);
      return data;
    } catch (error) {
      Notiflix.Notify.failure(error.message);
      return rejectWithValue(error);
    }
  }
);

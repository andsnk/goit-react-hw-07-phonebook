import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteContactApi } from 'api/api';
import { addContactApi } from 'api/api';
import { getContactsApi } from 'api/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

//===================================================
//-add loader
//-red redux store
//===================================================

// export const fetchContacts = () => async dispatch => {
//   try {
//     dispatch(contactsSlice.actions.pending());
//     const data = await getContacts();
//     console.log(data);
//     dispatch(contactsSlice.actions.fulfilled(data));
//   } catch (error) {
//     dispatch(contactsSlice.actions.rejected(error));
//   }
// };

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContactsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAllContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error.message;
      });
  },

  // extraReducers: {
  //   [fetchContacts.pending]: state => {
  //     state.isLoading = true;
  //   },
  //   [fetchContacts.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     state.items = payload;
  //   },
  //   [fetchContacts.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     state.error = payload.error.message;
  //   },
  // },

  // reducers: {
  //   pending: state => {
  //     state.isLoading = true;
  //   },
  //   fulfilled: (state, { payload }) => {
  //     state.isLoading = false;
  //     state.items = payload;
  //   },
  //   rejected: (state, { payload }) => {
  //     state.isLoading = false;
  //     state.error = payload.error.message;
  //   },

  //   // addContact: (state, action) => {
  //   //   state.push(action.payload);
  //   // },
  //   // deleteContact: (state, action) => {
  //   //   return state.filter(el => el.id !== action.payload);
  //   // },
  // },
});

// export const { adddContact, deeleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

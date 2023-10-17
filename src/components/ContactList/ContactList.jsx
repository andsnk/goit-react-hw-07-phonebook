import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoading,
  selectContacts,
  selectFilteredContacts,
  selectError,
} from 'redux/selectors';
import { deleteContact, fetchAllContacts } from 'redux/thunks';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '30px',
  opacity: 1,
});

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  console.log(contacts);
  const filter = useSelector(selectFilteredContacts);
  const filteredContacts = filter ? filter : contacts;
  // if (error) {
  //   console.log(error);
  //   Notiflix.Notify.failure(error);
  // }
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <>
      {error && <p>{error}</p>}
      <div className={`${isLoading ? css.loader : css.noneLoader}`}></div>
      <ul className={`${css.list} ${isLoading && css.blurred}`}>
        {filteredContacts.map(contact => (
          <li className={css.item} key={contact.id}>
            <span className={css.name}>{contact.name}:</span>
            <span className={css.number}>{contact.number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => {
                dispatch(deleteContact(contact.id));
                Notiflix.Notify.info(
                  `Contact ${contact.name} has been deleted.`
                );
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contacts;

// import React from 'react';
// import css from './ContactList.module.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectContacts, selectFilter } from 'redux/selectors';
// import { deleteContact } from 'redux/contactsSlice';

// const Contacts = () => {
//   const dispatch = useDispatch();
//   const filter = useSelector(selectFilter);
//   const contacts = useSelector(selectContacts);

//   // Фільтруємо контакти, якщо фільтр встановлено
//   const filteredContacts = filter
//     ? contacts.filter(contact => {
//         const normalizedValue = filter.toLowerCase().trim();
//         return contact.name.toLowerCase().includes(normalizedValue);
//       })
//     : contacts;

//   return (
//     <ul className={css.list}>
//       {filteredContacts.map(contact => (
//         <li className={css.item} key={contact.id}>
//           <span className={css.name}>{contact.name}:</span>
//           <span className={css.number}>{contact.number}</span>
//           <button
//             className={css.deleteBtn}
//             onClick={() => dispatch(deleteContact(contact.id))}
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Contacts;

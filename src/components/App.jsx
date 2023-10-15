import React, { useEffect } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '30px',
  opacity: 1,
});

const App = () => {
  const contacts = useSelector(selectContacts);
  useEffect(() => {
    Notiflix.Notify.info(`You have ${contacts.length} contacts`);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;

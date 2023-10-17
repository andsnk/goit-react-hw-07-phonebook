import React from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '30px',
  opacity: 1,
});

const App = () => {
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

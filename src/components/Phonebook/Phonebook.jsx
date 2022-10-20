import React from 'react';
import { useState, useEffect } from 'react';
import PhoneBookForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

export default function PhoneBookSection() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = event => {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value);
  };

  const handleFindNumber = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedNameFilter = filter.toLocaleLowerCase();
    const filteredName = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const filterResult = normalizedName.includes(normalizedNameFilter);
      return filterResult;
    });
    return filteredName;
  };

  const handleSubmitForm = data => {
    setContacts(prevState => [data, ...prevState]);
  };

  const removeNumber = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <PhoneBookForm submitData={handleSubmitForm} dataArr={contacts} />
      <div>
        <h2>Contacts</h2>
        <Filter search={filter} changeValue={handleChange} />
        <ContactList array={handleFindNumber()} deleteNumber={removeNumber} />
      </div>
    </>
  );
}

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import {
  ContactFofmSection,
  Fofm,
  FormLabel,
  FormInput,
  FormBtn,
} from './ContactForm.stysed';

function PhoneBookForm({ dataArr, submitData }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactNameId = nanoid();
  const contactTellId = nanoid();

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;

      case 'number':
        setNumber(event.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const findName = name => {
    return dataArr.find(arr => {
      const nameInArr = arr.name.toLocaleLowerCase();
      const newName = name.toLocaleLowerCase();
      return nameInArr === newName;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const addName = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (findName(name)) {
      return Report.failure(
        'Something went wrong',
        'This name is already in the contact list!',
        'Okay'
      );
    } else {
      submitData(addName);
      setName('');
      setNumber('');
    }
  };

  return (
    <ContactFofmSection>
      <Fofm onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor={contactNameId}>Name</FormLabel>
          <FormInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={contactNameId}
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor={contactTellId}>Number</FormLabel>
          <FormInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={contactTellId}
            value={number}
            onChange={handleChange}
          />
        </div>
        <FormBtn type="submit">Add contact</FormBtn>
      </Fofm>
    </ContactFofmSection>
  );
}

export default PhoneBookForm;

PhoneBookForm.propTypes = {
  submitData: PropTypes.func.isRequired,
  dataArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

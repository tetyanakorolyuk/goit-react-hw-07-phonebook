import React from 'react';
import ContactListItem from './ContactListItem';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/contacts/selectors';
import { useFetchContactsQuery } from '../../redux/contacts/contactsSlice';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  console.log('contacts:', contacts);
  const filter = useSelector(getFilter);
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
    const filteredContacts = getVisibleContacts();

return (
  <ul className={s.list}>
    {filteredContacts?.map(contact => (
      <ContactListItem
        key={contact.id}
        {...contact}
      />
    ))}
  </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
  }),
  ),
}

export default ContactList;

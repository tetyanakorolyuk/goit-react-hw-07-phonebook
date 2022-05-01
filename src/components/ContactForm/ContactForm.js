import { useState } from 'react';
import { useCreateContactMutation, useFetchContactsQuery } from '../../redux/contacts/contactsSlice';
import { Spinner } from '../Spinner/spinner';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [createContact] = useCreateContactMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { data: contacts, isFetching } = useFetchContactsQuery();

  const handleChange = e => {
  const { name, value } = e.currentTarget;

  switch (name) {
    case 'name':
      setName(value);
      break;

    case 'phone':
      setPhone(value);
      break;

    default:
      return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
      if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        toast.error(`${name} is already in contacts.`);
        return;
        }
        createContact({ name, phone});
        reset();
        toast.success(`${name} was added to contacts`);
  }

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
  <>
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        />
      </label>
      <label className={s.label}>
        Number
        <input
        type="tel"
        name="phone"
        value={phone}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      </label>
      <button className={s.buttonAdd} type="submit" disabled={isFetching}>Add contact</button>
      </form>
      {isFetching && <Spinner size={14} />}
  </>
  );
}

export default ContactForm;

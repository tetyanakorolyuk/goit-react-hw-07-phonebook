import { useDeleteContactMutation } from '../../redux/contacts/contactsSlice';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactListItem = ({ id, name, phone }) => {
  const [onDelete, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <li className={s.item}>
      <span>{name}:</span>
      <span>{phone}</span>
      <button type="button" className={s.buttonDelete}
      onClick={() => {
        onDelete(id);
        toast.info(`${name} was deleted from contacts!`);
      }}
      disabled={isDeleting}>
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ContactListItem;

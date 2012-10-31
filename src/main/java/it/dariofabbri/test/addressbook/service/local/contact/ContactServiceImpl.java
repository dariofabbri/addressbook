package it.dariofabbri.test.addressbook.service.local.contact;

import it.dariofabbri.test.addressbook.model.contact.Contact;
import it.dariofabbri.test.addressbook.service.local.AbstractService;

import java.util.List;

import org.hibernate.Query;

public class ContactServiceImpl extends AbstractService implements ContactService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Contact> listContacts() {

		String hql =
				"from Contact con ";
		Query query = session.createQuery(hql);
		List<Contact> list = query.list();
		logger.debug("Contacts found: " + list);
		
		return list;

	}

	@Override
	public Contact retrieveContactById(Integer id) {

		String hql = 
				"from Contact con " +
				"where con.id = :id";
		Query query = session.createQuery(hql);
		query.setParameter("id", id);
		Contact contact = (Contact)query.uniqueResult();
		logger.debug("Contact found: " + contact);
		
		return contact;
	}

	@Override
	public boolean deleteContactById(Integer id) {
		
		Contact contact = retrieveContactById(id);
		if(contact == null)
			return false;
		
		session.delete(contact);
		return true;
	}

	@Override
	public boolean createContact(String firstName, String lastName, String phoneNumber) {
		
		Contact contact = new Contact();
		
		contact.setFirstName(firstName);
		contact.setLastName(lastName);
		contact.setPhoneNumber(phoneNumber);
		
		session.save(contact);
		
		return true;
	}

	@Override
	public boolean updateContact(Integer id, String firstName, String lastName, String phoneNumber) {
		
		Contact contact = retrieveContactById(id);
		if(contact == null)
			return false;
		
		contact.setFirstName(firstName);
		contact.setLastName(lastName);
		contact.setPhoneNumber(phoneNumber);
		
		session.update(contact);
		
		return true;
	}
}

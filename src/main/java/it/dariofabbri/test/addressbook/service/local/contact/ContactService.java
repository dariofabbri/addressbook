package it.dariofabbri.test.addressbook.service.local.contact;

import it.dariofabbri.test.addressbook.model.contact.Contact;
import it.dariofabbri.test.addressbook.service.local.Service;

import java.util.List;

public interface ContactService extends Service {

	List<Contact> listContacts();

	Contact retrieveContactById(Integer id);

	boolean deleteContactById(Integer id);

	boolean createContact(String firstName, String lastName, String phoneNumber);

	boolean updateContact(Integer id, String firstName, String lastName, String phoneNumber);
}
package it.dariofabbri.test.addressbook.service.local.contact;

import it.dariofabbri.test.addressbook.model.contact.Contact;
import it.dariofabbri.test.addressbook.service.local.Query;

import org.hibernate.Session;

public class QueryContactByFirstNameLastNamePhoneNumber extends Query<Contact> {

	private String firstName;
	private String lastName;
	private String phoneNumber;
	
	public QueryContactByFirstNameLastNamePhoneNumber(Session session) {
		
		super(session);
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Override
	protected boolean checkQueryArguments() {

		return true;
	}

	@Override
	protected String getCountHql() {

		String hql = 
				"select count(*) " +
				"from Contact con " +
				"where 1 = 1 ";
		
		if(firstName != null)
			hql += "and upper(con.firstName) like :firstName ";
		
		if(lastName != null)
			hql += "and upper(con.lastName) like :lastName ";
		
		if(phoneNumber != null)
			hql += "and upper(con.phoneNumber) like :phoneNumber ";

		return hql;
	}

	@Override
	protected String getQueryHql() {

		String hql = 
				"from Contact con " +
				"where 1 = 1 ";
		
		if(firstName != null)
			hql += "and upper(con.firstName) like :firstName ";
		
		if(lastName != null)
			hql += "and upper(con.lastName) like :lastName ";
		
		if(phoneNumber != null)
			hql += "and upper(con.phoneNumber) like :phoneNumber ";

		hql += "order by con.id ";
		
		return hql;
	}

	@Override
	protected void setQueryArguments(org.hibernate.Query q) {

		String[] named_params = q.getNamedParameters();
		for (int i = 0; i < named_params.length; ++i) {
			String param = named_params[i];

			if (param.equals("firstName"))
				q.setParameter("firstName", "%" + firstName.toUpperCase() + "%");
			
			else if (param.equals("lastName"))
				q.setParameter("lastName", "%" + lastName.toUpperCase() + "%");
			
			else if (param.equals("phoneNumber"))
				q.setParameter("phoneNumber",  "%" + phoneNumber.toUpperCase() + "%");
		}
	}
}
package it.dariofabbri.test.addressbook.rest.resource;


import it.dariofabbri.test.addressbook.rest.dto.ContactDTO;
import it.dariofabbri.test.addressbook.rest.dto.ContactsDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/contacts")
@Produces("application/json")
public class ContactResource {

	private static final Logger logger = LoggerFactory.getLogger(ContactResource.class);
	
	private static List<ContactDTO> contacts;
	
	static {
		contacts = new ArrayList<ContactDTO>();
		
		ContactDTO contact = new ContactDTO();
		contact.setId(1);
		contact.setFirstName("Mario");
		contact.setLastName("Rossi");
		contact.setPhoneNumber("338.123456");
		contacts.add(contact);
		
		contact = new ContactDTO();
		contact.setId(2);
		contact.setFirstName("Luigi");
		contact.setLastName("Bianchi");
		contact.setPhoneNumber("338.234567");
		contacts.add(contact);
		
		contact = new ContactDTO();
		contact.setId(3);
		contact.setFirstName("Gino");
		contact.setLastName("Verdi");
		contact.setPhoneNumber("338.345678");
		contacts.add(contact);
		
		for(int i = 0; i < 100; ++i) {
			contact = new ContactDTO();
			contact.setId(4 + i);
			contact.setFirstName(buildRandomName());
			contact.setLastName(buildRandomName());
			contact.setPhoneNumber(buildRandomPhone());
			contacts.add(contact);
		}
	}
	
	private static String buildRandomName() {
		
		Random rnd = new Random();
		int length = rnd.nextInt(40);
		
		StringBuffer sb = new StringBuffer();
		for(int i = 0; i < length; ++i) {
			sb.append((char)('A' + rnd.nextInt(26)));
		}
		return sb.toString();
	}
	
	private static String buildRandomPhone() {
		
		Random rnd = new Random();
		int length = rnd.nextInt(15);
		
		StringBuffer sb = new StringBuffer();
		for(int i = 0; i < length; ++i) {
			sb.append((char)('0' + rnd.nextInt(10)));
		}
		return sb.toString();
	}
	
	@GET
	public Response getContacts(
			@QueryParam("page") Integer page,
			@QueryParam("pagesize") Integer pageSize) {

		logger.debug("getContacts called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:list")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		if(page == null) {
			page = 0;
		}
		else {
			page = page - 1;
		}
		
		if(pageSize == null) {
			pageSize = 10;
		}
		
		List<ContactDTO> result = new ArrayList<ContactDTO>();
		for(int i = 0; i < pageSize; ++i) {
			int j = page * pageSize + i;
			if(j >= contacts.size())
				break;
			result.add(contacts.get(j));
		}
		
		ContactsDTO response = new ContactsDTO();
		response.setPage(page);
		response.setPageSize(pageSize);
		response.setRecordsFound(contacts.size());
		response.setResults(result);
		
		return Response.ok().entity(response).build();
	}
	
	@GET
	@Path("/{id}")
	public Response getContact(@PathParam("id") Integer id) {

		logger.debug("getContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:get")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		ContactDTO contact = findById(id);
		
		return Response.ok().entity(contact).build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteContact(@PathParam("id") Integer id) {
		
		logger.debug("deleteContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:delete")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		ContactDTO contactToBeDeleted = findById(id);
		
		if(contactToBeDeleted != null) {
			contacts.remove(contactToBeDeleted);
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).build();
		}
	}
	
	@POST
	@Consumes("application/json")
	public Response createContact(ContactDTO contact) {
		
		logger.debug("createContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:create")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}

		if(contact.getId() == null)
			contact.setId(getNextId());
		
		contacts.add(contact);
		return Response.ok().build();
	}
	
	@PUT
	@Consumes("application/json")
	@Path("/{id}")
	public Response updateContact(@PathParam("id") Integer id, ContactDTO contact) {
		
		logger.debug("updateContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:update")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		ContactDTO contactToBeUpdated = findById(id);
		
		if(contactToBeUpdated != null) {
			contactToBeUpdated.setFirstName(contact.getFirstName());
			contactToBeUpdated.setLastName(contact.getLastName());
			contactToBeUpdated.setPhoneNumber(contact.getPhoneNumber());
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).build();
		}
	}
	
	private ContactDTO findById(Integer id) {
		
		ContactDTO foundContact = null;
		for(ContactDTO contact : contacts) {
			if(contact.getId().equals(id)) {
				foundContact = contact;
			}
		}

		return foundContact;
	}
	
	private Integer getNextId() {
		Integer max = null;
		for(ContactDTO contact : contacts) {
			if(max == null) {
				max = contact.getId();
			}
			else if(max < contact.getId()) {
				max = contact.getId();
			}
		}

		return max == null ? 1 : max + 1;
	}
}

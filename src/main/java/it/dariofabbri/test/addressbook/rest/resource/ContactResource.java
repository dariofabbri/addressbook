package it.dariofabbri.test.addressbook.rest.resource;


import it.dariofabbri.test.addressbook.rest.dto.ContactDTO;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
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
	}
			
	@GET
	public Response getContacts() {

		logger.debug("getContacts called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:list")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		return Response.ok().entity(contacts).build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteContact(@PathParam("id") Integer id) {
		
		logger.debug("deleteContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:delete")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		ContactDTO contactToBeDeleted = null;
		for(ContactDTO contact : contacts) {
			if(contact.getId().equals(id)) {
				contactToBeDeleted = contact;
			}
		}
		
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

		contacts.add(contact);
		return Response.ok().build();
	}
}

package it.dariofabbri.test.addressbook.service.rest.resource;


import it.dariofabbri.test.addressbook.model.contact.Contact;
import it.dariofabbri.test.addressbook.service.local.ServiceFactory;
import it.dariofabbri.test.addressbook.service.local.contact.ContactService;
import it.dariofabbri.test.addressbook.service.rest.dto.ContactDTO;
import it.dariofabbri.test.addressbook.service.rest.dto.ContactsDTO;

import java.util.ArrayList;
import java.util.List;

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
import org.dozer.DozerBeanMapperSingletonWrapper;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/contacts")
@Produces("application/json")
public class ContactResource {

	private static final Logger logger = LoggerFactory.getLogger(ContactResource.class);
	
	@GET
	public Response getContacts(
			@QueryParam("firstName") String firstName,
			@QueryParam("lastName") String lastName,
			@QueryParam("phoneNumber") String phoneNumber,
			@QueryParam("offset") Integer offset,
			@QueryParam("limit") Integer limit) {

		logger.debug("getContacts called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:list")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		if(offset == null) {
			offset = 0;
		}
		
		if(limit == null) {
			limit = 10;
		}
		
		// Execute query.
		//
		ContactService cs = ServiceFactory.createContactService();
		List<Contact> list = cs.listContacts();
		
		// Set up response.
		//
		ContactsDTO response = new ContactsDTO();
		response.setOffset(offset);
		response.setLimit(limit);
		response.setRecords(list.size());
		response.setResults(new ArrayList<ContactDTO>());
		Mapper mapper = DozerBeanMapperSingletonWrapper.getInstance();
        mapper.map(list, response.getResults());
		
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
		
		ContactService cs = ServiceFactory.createContactService();
		Contact contact = cs.retrieveContactById(id);

		Mapper mapper = DozerBeanMapperSingletonWrapper.getInstance();
        ContactDTO dto = mapper.map(contact, ContactDTO.class);

		return Response.ok().entity(dto).build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteContact(@PathParam("id") Integer id) {
		
		logger.debug("deleteContact called!");
		
		Subject currentUser = SecurityUtils.getSubject();
		if(!currentUser.isPermitted("contacts:delete")) {
			return Response.status(Status.UNAUTHORIZED).entity("Operation not permitted.").build();
		}
		
		ContactService cs = ServiceFactory.createContactService();
		boolean result = cs.deleteContactById(id);
		
		if(result) {
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

		ContactService cs = ServiceFactory.createContactService();
		boolean result = cs.createContact(
				contact.getFirstName(),
				contact.getLastName(),
				contact.getPhoneNumber());
		
		if(result) {
			return Response.ok().build();
		}
		else {
			return Response.status(Status.CONFLICT).build();
		}
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

		ContactService cs = ServiceFactory.createContactService();
		boolean result = cs.updateContact(
				id,
				contact.getFirstName(),
				contact.getLastName(),
				contact.getPhoneNumber());
		
		if(result) {
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).build();
		}
	}
}

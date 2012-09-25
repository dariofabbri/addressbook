package it.dariofabbri.test.addressbook.rest.service;


import it.dariofabbri.test.addressbook.rest.dto.Book;

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
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/books")
@Produces("application/json")
public class BookResource {

	private static final Logger logger = LoggerFactory.getLogger(BookResource.class);
	
	private static List<Book> books;
	
	static {
		books = new ArrayList<Book>();

		Book book = new Book();
		book.setId(1);
		book.setAuthor("Dario Fabbri");
		book.setTitle("Best tutorial ever");
		book.setReleaseDate("10/9/2012");
		book.setKeywords("Tech");
		books.add(book);
		
		book = new Book();
		book.setId(2);
		book.setAuthor("Gino Pilota");
		book.setTitle("The truth on JavaScript");
		book.setReleaseDate("11/9/2012");
		book.setKeywords("Tech");
		books.add(book);
	}
	
	public BookResource() {
	}
	
	@GET
	@Path("/session/{sessionId}")
	public String bySession(
			@PathParam("sessionId") String sessionId) {
		
		logger.debug("session id: " + sessionId);
		
		Subject requestSubject = new Subject.Builder().sessionId(sessionId).buildSubject();
		requestSubject.getSession(false).touch();
		logger.info("requestSubject principal: " + requestSubject.getPrincipal());
		logger.info("Last updated: " + requestSubject.getSession().getLastAccessTime());

		return requestSubject.getPrincipal().toString();
	}
	
	@GET
	@Path("/username/{username}/password/{password}")
	public String getToken(
			@PathParam("username") String username,
			@PathParam("password") String password) {

		logger.debug("Username: " + username);
		logger.debug("Password: " + password);
		
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		Subject.Builder builder = new Subject.Builder();
		Subject currentUser = builder.buildSubject();
		currentUser.login(token);
		String sessionId = currentUser.getSession(true).getId().toString();
		
		logger.info("Session id: " + sessionId);
		return sessionId;
	}
			
	@GET
	public List<Book> getBooks() {

		logger.debug("getBooks called!");
		
		UsernamePasswordToken token = new UsernamePasswordToken("dario", "password1");
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.login(token);
		
		return books;
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteBook(@PathParam("id") Integer id) {
		logger.debug("deleteBook called!");
		
		Book bookToBeDeleted = null;
		for(Book book : books) {
			if(book.getId().equals(id)) {
				bookToBeDeleted = book;
			}
		}
		
		if(bookToBeDeleted != null) {
			books.remove(bookToBeDeleted);
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).build();
		}
	}
	
	@POST
	@Consumes("application/json")
	public Response createBook(Book book) {
		
		logger.debug("createBook called!");
		
		books.add(book);
		return Response.ok().build();
	}
}

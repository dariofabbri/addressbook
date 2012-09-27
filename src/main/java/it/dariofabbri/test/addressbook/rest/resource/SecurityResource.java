package it.dariofabbri.test.addressbook.rest.resource;


import it.dariofabbri.test.addressbook.rest.dto.CredentialsDTO;
import it.dariofabbri.test.addressbook.rest.dto.TokenDTO;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.session.mgt.DefaultSessionKey;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/security")
@Produces("application/json")
public class SecurityResource {

	private static final Logger logger = LoggerFactory.getLogger(SecurityResource.class);
	
	@POST
	@Path("/")
	@Consumes("application/json")
	public Response createSession(CredentialsDTO credentials) {

		if(credentials == null) {
			return Response
				.status(Status.INTERNAL_SERVER_ERROR)
				.entity("No credentials received.")
				.build();
		}
		
		Subject.Builder builder = new Subject.Builder();
		Subject currentUser = builder.buildSubject();

		UsernamePasswordToken upt = new UsernamePasswordToken(
				credentials.getUsername(),
				credentials.getPassword());
		currentUser.login(upt);
		String sessionId = currentUser.getSession(true).getId().toString();
		
		TokenDTO token = new TokenDTO();
		token.setToken(sessionId);
		
		logger.info("Session id: " + sessionId);
		return Response
			.ok()
			.entity(token)
			.build();
	}
	
	
	@DELETE
	@Path("/{token}")
	public Response deleteSession(
			@PathParam("token") String token) {

		// SecurityResource token must be present.
		//
		if(token == null) {
			return Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity("No token received.")
					.build();
		}
		
		// Check if the passed token is associated with a valid session.
		//
		try {
			Session session = SecurityUtils.getSecurityManager().getSession(new DefaultSessionKey(token));
			if(session == null) {
				return Response
						.status(Status.NOT_FOUND)
						.entity("Session not found using provided token.")
						.build();
			}
			
			// Terminate current session.
			//
			session.stop();
			return Response
					.ok()
					.build();

		} catch(SessionException se) {
			return Response
					.status(Status.NOT_FOUND)
					.entity("Session not found using provided token.")
					.build();		
		}
	}	
}

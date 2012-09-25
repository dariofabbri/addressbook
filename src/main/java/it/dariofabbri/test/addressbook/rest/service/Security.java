package it.dariofabbri.test.addressbook.rest.service;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/security")
@Produces("application/json")
public class Security {

	private static final Logger logger = LoggerFactory.getLogger(Security.class);
	
	@GET
	@Path("/newsession/username/{username}/password/{password}")
	public String getToken(
			@PathParam("username") String username,
			@PathParam("password") String password) {

		logger.debug("Username: " + username);
		logger.debug("Password: " + password);
		
		Subject.Builder builder = new Subject.Builder();
		Subject currentUser = builder.buildSubject();

		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		currentUser.login(token);
		String sessionId = currentUser.getSession(true).getId().toString();
		
		logger.info("Session id: " + sessionId);
		return sessionId;
	}
}

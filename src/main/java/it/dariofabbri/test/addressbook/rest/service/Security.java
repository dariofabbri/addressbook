package it.dariofabbri.test.addressbook.rest.service;


import it.dariofabbri.test.addressbook.rest.dto.BooleanResult;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

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
public class Security {

	private static final Logger logger = LoggerFactory.getLogger(Security.class);
	
	@GET
	@Path("/username/{username}/password/{password}")
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
	
	@GET
	@Path("/checksession/{sessionId}")
	public BooleanResult checkSession(
			@PathParam("sessionId") String sessionId) {
		
		logger.debug("Passed session id: " + sessionId);

		BooleanResult br = new BooleanResult();
		
		Subject requestSubject = null;
		try {
			SecurityUtils.getSecurityManager().getSession(new DefaultSessionKey(sessionId));
		} catch(SessionException se) {
			logger.info("Invalid session token.");
			br.setResult(false);
			return br;			
		}
		
		requestSubject = new Subject.Builder().sessionId(sessionId).buildSubject();		
		Session session = requestSubject.getSession(false);
		logger.info("requestSubject principal: " + requestSubject.getPrincipal());
		logger.info("Session: " + session);
		logger.info("Last updated: " + session.getLastAccessTime());

		br.setResult(true);
		return br;
	}
}

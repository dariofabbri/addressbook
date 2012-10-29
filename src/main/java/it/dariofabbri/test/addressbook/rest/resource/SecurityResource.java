package it.dariofabbri.test.addressbook.rest.resource;


import it.dariofabbri.test.addressbook.rest.dto.CredentialsDTO;
import it.dariofabbri.test.addressbook.rest.dto.TokenDTO;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.naming.InitialContext;
import javax.sql.DataSource;
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
	
		
		
		
	@GET
	@Path("/ds")
	public Response getDs() {
		
		logger.debug("getDs called!");
		
		try {
			InitialContext cxt = new InitialContext();
			DataSource ds = (DataSource) cxt.lookup( "java:/comp/env/jdbc/ivncr" );
		
			if ( ds == null ) {
			   throw new Exception("Data source not found!");
			}
			
			Connection connection = ds.getConnection();
			DatabaseMetaData dbmd = connection.getMetaData();
			ResultSet rs = dbmd.getTables(null, null, null, null);
			while(rs.next()) {
				
				System.out.println(String.format("%s.%s",
						rs.getString("TABLE_SCHEM"),
						rs.getString("TABLE_NAME")));
				
			}
			rs.close();
			
			
			Statement statement = connection.createStatement();
			rs = statement.executeQuery("SELECT * FROM sec_user");
			while(rs.next()) {
				
				System.out.println(String.format("(%d, %s, %s)", 
						rs.getInt(1),
						rs.getString(2),
						rs.getString(3)));
			}
			
			rs.close();
			statement.close();
			connection.close();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return Response.ok().build();
	}
}

package it.dariofabbri.test.addressbook.rest.filter;

import it.dariofabbri.test.addressbook.rest.service.Security;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.session.mgt.DefaultSessionKey;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.SubjectThreadState;
import org.apache.shiro.util.ThreadState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ShiroFilter implements Filter {

	private static final Logger logger = LoggerFactory.getLogger(Security.class);

	protected static final String SECURITY_TOKEN = "X-Security-Token";
	private Pattern excludePattern = null;
	
	@Override
	public void init(FilterConfig filterConfig) 
		throws ServletException {

		String exclude = filterConfig.getInitParameter("exclude");
		if(exclude != null) {
			excludePattern = Pattern.compile(exclude);
		}
	}

	@Override
	public void doFilter(
			ServletRequest request, 
			ServletResponse response,
			FilterChain chain) 
		throws IOException, ServletException {

		// Check request type.
		//
		if(!(request instanceof HttpServletRequest))
			throw new ServletException("Unexpected request class detected.");
		HttpServletRequest hsr = (HttpServletRequest)request;
		
		// Try to match URL against exclude pattern.
		//
		String requestUri = hsr.getRequestURI();
		if(excludePattern != null && excludePattern.matcher(requestUri).matches()) {
			chain.doFilter(request, response);
			return;
		}

		// Extract security token from custom header.
		//
		String token = hsr.getHeader(SECURITY_TOKEN);
		logger.debug("Passed security token: " + token);

		// Security token must be present.
		//
		if(token == null) {
			throw new ServletException("Null token detected.");
		}
		
		// Check if the passed token is associated with a valid session.
		//
		try {
			Session session = SecurityUtils.getSecurityManager().getSession(new DefaultSessionKey(token));
			if(session == null)
				throw new ServletException("Invalid session token."); 
		} catch(SessionException se) {
			logger.info("Invalid session token. Cause: " + se.getMessage());
			throw new ServletException("Invalid session token. Cause: " + se.getMessage());
		}
		
		Subject requestSubject = new Subject.Builder().sessionId(token).buildSubject();		
		ThreadState threadState = new SubjectThreadState(requestSubject);
		threadState.bind();
		try {
			chain.doFilter(request, response);
		}
		finally {
			threadState.clear();
		}
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}

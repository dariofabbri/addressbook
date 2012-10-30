package it.dariofabbri.test.addressbook.service.local;

import it.dariofabbri.test.addressbook.service.local.security.SecurityService;
import it.dariofabbri.test.addressbook.service.local.security.SecurityServiceImpl;

public class ServiceFactory {
	
	public static SecurityService getSecurityService() {
		
		SecurityService service = SessionDecorator.<SecurityService>createProxy(new SecurityServiceImpl(), SecurityService.class);
		return service;
	}

}

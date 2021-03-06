package it.dariofabbri.test.addressbook.service.local;

import it.dariofabbri.test.addressbook.model.security.User;
import it.dariofabbri.test.addressbook.service.local.security.SecurityService;
import it.dariofabbri.test.addressbook.util.HibernateUtil;

import java.net.URL;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.junit.Before;
import org.junit.Test;

public class SecurityServiceTest {

	@Before
	public void setup() {

		Configuration configuration = new Configuration();
		URL url = this.getClass().getResource("/test-hibernate.cfg.xml");
    	configuration.configure(url);
    	ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry(); 
    	SessionFactory factory = configuration.buildSessionFactory(serviceRegistry);
	
    	HibernateUtil.setSessionFactory(factory);
	}
	
	@Test
	public void test() {
		
		SecurityService ss = ServiceFactory.createSecurityService();
		
		User user = ss.getByUsername("admin");
		System.out.println(user);
	}
}

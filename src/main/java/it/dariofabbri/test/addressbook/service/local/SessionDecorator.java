package it.dariofabbri.test.addressbook.service.local;

import it.dariofabbri.test.addressbook.util.HibernateUtil;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SessionDecorator<T extends Service> implements InvocationHandler  {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private T proxied;
	
	public SessionDecorator(T proxied) {
		
		this.proxied = proxied;
	}
	
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {

		// Open the Hibernate session.
		//
		org.hibernate.Session session = HibernateUtil.getSessionFactory().openSession();
		
		// Set the session in the proxied service class.
		//
		proxied.setSession(session);

		Transaction transaction = null;
		try {
			
			// Start a transaction.
			//
			transaction = session.beginTransaction();

			// Execute method in proxied class.
			//
			Object result = method.invoke(proxied, args);
			
			// Commit transaction.
			//
			transaction.commit();
			
			// Return service result.
			//
			return result;
		}
		catch(Exception e) {

			logger.error("Exception caught while running service method.", e);

			// Try to rollback current transaction.
			//
			try {
				if(transaction != null)
					transaction.rollback();
			}
			catch(Exception e1) {
				logger.error("Exception caught while trying to rollback transaction.", e1);
			}
			
			throw new RuntimeException("Exception caught while running service method.", e);
		}
		finally {
			
			// Try to close opened session.
			//
			try {
				session.close();
			}
			catch(Exception e) {
				logger.error("Exception caught while closing session.", e);
				throw new RuntimeException("Exception caught while closing session.", e);
			}
		}
	}

	@SuppressWarnings("unchecked")
	public static<T extends Service> T createProxy(T proxied, Class<T> clazz) {
		
		T t = (T) Proxy.newProxyInstance(
			Thread.currentThread().getContextClassLoader(),
			new Class[] { clazz },
			new SessionDecorator<T>(proxied));
		
		return t;
	};
}

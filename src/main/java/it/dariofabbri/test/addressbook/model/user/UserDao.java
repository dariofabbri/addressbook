package it.dariofabbri.test.addressbook.model.user;

import it.dariofabbri.test.addressbook.util.HibernateUtil;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserDao {

	private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

	public User getByUsername(String username) {

		org.hibernate.Session session = HibernateUtil.getSessionFactory().getCurrentSession();

		try {
			session.beginTransaction();
	
			String hql = 
					"from User use " +
					"left join fetch use.roles rol " +
					"left join fetch rol.permissions " +
					"where use.username = :username";
			Query query = session.createQuery(hql);
			query.setParameter("username", username);
			User user = (User)query.uniqueResult();
			logger.debug("User found: " + user);
			
			return user;
		}
		catch(Exception e) {
			logger.error("Exception caught while executing query.", e);
			throw new RuntimeException("Exception caught while executing query.", e);
		}
		finally {
			session.close();
		}
	}
}

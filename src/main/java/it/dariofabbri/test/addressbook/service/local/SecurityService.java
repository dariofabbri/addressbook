package it.dariofabbri.test.addressbook.service.local;

import it.dariofabbri.test.addressbook.model.permission.Permission;
import it.dariofabbri.test.addressbook.model.role.Role;
import it.dariofabbri.test.addressbook.model.user.User;
import it.dariofabbri.test.addressbook.util.HibernateUtil;

import java.util.List;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SecurityService {

	private static final Logger logger = LoggerFactory.getLogger(SecurityService.class);

	public User getByUsername(String username) {

		org.hibernate.Session session = HibernateUtil.getSessionFactory().getCurrentSession();

		try {
			session.beginTransaction();
	
			String hql = 
					"from User use " +
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

	
	@SuppressWarnings("unchecked")
	public List<Role> getUserRoles(String username) {

		org.hibernate.Session session = HibernateUtil.getSessionFactory().getCurrentSession();

		try {
			session.beginTransaction();
	
			String hql =
					"select distinct rol from Role rol " +
					"left join rol.users use " +
					"where use.username = :username";
			Query query = session.createQuery(hql);
			query.setParameter("username", username);
			List<Role> roles = query.list();
			logger.debug("Roles found: " + roles);
			
			return roles;
		}
		catch(Exception e) {
			logger.error("Exception caught while executing query.", e);
			throw new RuntimeException("Exception caught while executing query.", e);
		}
		finally {
			session.close();
		}		
	}

	
	@SuppressWarnings("unchecked")
	public List<Permission> getUserPermissions(String username) {

		org.hibernate.Session session = HibernateUtil.getSessionFactory().getCurrentSession();

		try {
			session.beginTransaction();
	
			String hql = 
					"select distinct per from Permission per " +
					"left join per.roles rol " +
					"left join rol.users use " +
					"where use.username = :username";
			Query query = session.createQuery(hql);
			query.setParameter("username", username);
			List<Permission> permissions = query.list();
			logger.debug("Permissions found: " + permissions);
			
			return permissions;
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

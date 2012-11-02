package it.dariofabbri.test.addressbook.service.local.security;

import it.dariofabbri.test.addressbook.model.security.Permission;
import it.dariofabbri.test.addressbook.model.security.Role;
import it.dariofabbri.test.addressbook.model.security.User;
import it.dariofabbri.test.addressbook.service.local.AbstractService;

import java.util.List;

import org.hibernate.Query;

public class SecurityServiceImpl extends AbstractService implements SecurityService {

	public User getByUsername(String username) {

		String hql = 
				"from User use " +
				"where use.username = :username";
		Query query = session.createQuery(hql);
		query.setParameter("username", username);
		User user = (User)query.uniqueResult();
		logger.debug("User found: " + user);
		
		return user;
	}

	
	@SuppressWarnings("unchecked")
	public List<Role> getUserRoles(String username) {

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

	
	@SuppressWarnings("unchecked")
	public List<Permission> getUserPermissions(String username) {

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
}

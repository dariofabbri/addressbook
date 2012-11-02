package it.dariofabbri.test.addressbook.service.local.security;

import it.dariofabbri.test.addressbook.model.security.Permission;
import it.dariofabbri.test.addressbook.model.security.Role;
import it.dariofabbri.test.addressbook.model.security.User;
import it.dariofabbri.test.addressbook.service.local.Service;

import java.util.List;

public interface SecurityService extends Service {

	User getByUsername(String username);

	List<Role> getUserRoles(String username);

	List<Permission> getUserPermissions(String username);
}
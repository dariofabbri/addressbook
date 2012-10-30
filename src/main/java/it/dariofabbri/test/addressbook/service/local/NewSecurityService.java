package it.dariofabbri.test.addressbook.service.local;

import it.dariofabbri.test.addressbook.model.permission.Permission;
import it.dariofabbri.test.addressbook.model.role.Role;
import it.dariofabbri.test.addressbook.model.user.User;

import java.util.List;

public interface NewSecurityService {

	User getByUsername(String username);

	List<Role> getUserRoles(String username);

	List<Permission> getUserPermissions(String username);
}
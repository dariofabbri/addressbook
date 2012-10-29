package it.dariofabbri.test.addressbook.security;

import it.dariofabbri.test.addressbook.model.user.User;
import it.dariofabbri.test.addressbook.model.user.UserDao;

import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class MyRealm extends AuthorizingRealm {

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {

		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
		String username = upToken.getUsername();

		// Null username is invalid.
		//
		if (username == null) {
			throw new AccountException(
					"Null usernames are not allowed by this realm.");
		}

		// Lookup user.
		//
		UserDao udao = new UserDao();
		User user = udao.getByUsername(username);
		if (user == null)
			throw new UnknownAccountException("No account found for user [" + username + "]");
		String password = user.getPassword();

		SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(username,
				password.toCharArray(), getName());

		// Always clean up cached authorization after a login.
		//
		clearCachedAuthorizationInfo(info.getPrincipals());

		return info;
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

		// Null usernames are invalid.
		//
		if (principals == null) {
			throw new AuthorizationException(
					"PrincipalCollection method argument cannot be null.");
		}
		
		String username = (String) getAvailablePrincipal(principals);
		
		if(!username.equals("admin"))
			throw new RuntimeException("Only admin user configured.");
		
		Set<String> roles = new HashSet<String>();
		roles.add("admin");
		
		Set<String> permissions = new HashSet<String>();
		permissions.add("*");
		
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roles);
		info.setStringPermissions(permissions);
		
		return info;
	}

}

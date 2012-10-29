INSERT INTO sec_user (id, username, password, firstname, lastname, description)
  VALUES (1, 'admin', 'admin', 'Administrator', 'Administrator', null);

INSERT INTO sec_role (id, rolename, description)
  VALUES (1, 'admin', null);

INSERT INTO sec_permission (id, permstring)
  VALUES (1, '*');

INSERT INTO sec_user_role (userid, roleid)
  VALUES (1, 1);

INSERT INTO sec_role_permission (roleid, permissionid)
  VALUES (1, 1);

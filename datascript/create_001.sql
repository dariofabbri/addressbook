CREATE TABLE sec_user
(
	id serial NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	description VARCHAR(4000)
);

CREATE TABLE sec_role
(
	id serial NOT NULL PRIMARY KEY,
	rolename VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(4000)
);

CREATE TABLE sec_permission
(
	id serial NOT NULL PRIMARY KEY,
	permstring VARCHAR(255) NOT NULL
);

CREATE TABLE sec_user_role
(
	userid INTEGER NOT NULL REFERENCES sec_user(id),
	roleid INTEGER NOT NULL REFERENCES sec_role(id),
	PRIMARY KEY(userid, roleid)
);

CREATE TABLE sec_role_permission
(
	roleid INTEGER NOT NULL REFERENCES sec_role(id),
	permissionid INTEGER NOT NULL REFERENCES sec_permission(id),
	PRIMARY KEY(roleid, permissionid)
);

CREATE TABLE con_contact
(
	id serial NOT NULL PRIMARY KEY,
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	phone varchar(255)
);

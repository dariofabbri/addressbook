package it.dariofabbri.test.addressbook.model.security;


import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sec_role")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "sec_role_id_seq")
	@SequenceGenerator(name = "sec_role_id_seq", sequenceName = "sec_role_id_seq")
	@Column(name="id")
	private Integer id;
	
	@Column(name="rolename")
	private String rolename;
	
	@Column(name="description")
	private String description;

	@OneToMany(orphanRemoval=true)
	@JoinTable(
			name="sec_role_permission",
			joinColumns = { @JoinColumn(name="roleid", referencedColumnName="id")},
			inverseJoinColumns = { @JoinColumn(name="permissionid", referencedColumnName="id")}
	)
	private Set<Permission> permissions;

	@OneToMany(orphanRemoval=true)
	@JoinTable(
			name="sec_user_role",
			joinColumns = { @JoinColumn(name="roleid", referencedColumnName="id")},
			inverseJoinColumns = { @JoinColumn(name="userid", referencedColumnName="id")}
	)
	private Set<User> users;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}

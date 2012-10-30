package it.dariofabbri.test.addressbook.model.permission;

import it.dariofabbri.test.addressbook.model.role.Role;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "sec_permission")
public class Permission {

	@Id
	@GeneratedValue
	@Column(name="id")
	private Integer id;
	
	@Column(name="permstring")
	private String permissionString;


	@OneToMany(orphanRemoval=true)
	@JoinTable(
			name="sec_role_permission",
			joinColumns = { @JoinColumn(name="permissionid", referencedColumnName="id")},
			inverseJoinColumns = { @JoinColumn(name="roleid", referencedColumnName="id")}
	)
	private List<Role> roles;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPermissionString() {
		return permissionString;
	}

	public void setPermissionString(String permissionString) {
		this.permissionString = permissionString;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
}

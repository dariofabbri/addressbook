package it.dariofabbri.test.addressbook.model.security;


import java.util.List;

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
@Table(name = "sec_permission")
public class Permission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "sec_permission_id_seq")
	@SequenceGenerator(name = "sec_permission_id_seq", sequenceName = "sec_permission_id_seq")
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

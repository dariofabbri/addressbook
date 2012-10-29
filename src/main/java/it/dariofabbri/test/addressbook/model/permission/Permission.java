package it.dariofabbri.test.addressbook.model.permission;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
}

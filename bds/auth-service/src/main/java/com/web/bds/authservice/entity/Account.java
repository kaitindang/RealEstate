package com.web.bds.authservice.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account")
public class Account {
	@Column(name = "id_account")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String username;


	@Column(name = "first_name")
	private  String firstname;

	@Column(name = "last_name")
	private String lastname;

	@Column
	private String email;
	
	@Column
	private String password;

	@Column(name = "date_of_birth")
	private Timestamp dateOfBirth;
	@Column
	private int phone;

	@Column
	private String avatar;

	@CreationTimestamp
	@Column
	private Timestamp create_date;
	
	@Column
	private Timestamp last_login;


	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "account_roles",
			joinColumns = @JoinColumn(name = "account_id"),inverseJoinColumns = @JoinColumn(name = "roles_id"))
	private Set<Role> roles = new HashSet<>();
	
	@Column
	private boolean enable_account = true;

	public Account(String username, String firstname, String lastname,
                   String email, String password, String avatar,
                   int phone, Timestamp dateOfBirth
				  ) {
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;

	}
	public Account(){};

	public Account(int id, String username, String firstname, String lastname, String email, String password, Timestamp dateOfBirth, int phone, String avatar, Timestamp create_date, Timestamp last_login, Set<Role> roles, boolean enable_account) {
		this.id = id;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.dateOfBirth = dateOfBirth;
		this.phone = phone;
		this.avatar = avatar;
		this.create_date = create_date;
		this.last_login = last_login;
		this.roles = roles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Timestamp getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Timestamp dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Timestamp getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Timestamp create_date) {
		this.create_date = create_date;
	}

	public Timestamp getLast_login() {
		return last_login;
	}

	public void setLast_login(Timestamp last_login) {
		this.last_login = last_login;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public boolean isEnable_account() {
		return enable_account;
	}

	public void setEnable_account(boolean enable_account) {
		this.enable_account = enable_account;
	}
}
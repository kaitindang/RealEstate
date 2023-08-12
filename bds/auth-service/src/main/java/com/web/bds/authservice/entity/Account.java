package com.web.bds.authservice.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
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
	private String address;

	@Lob
	@Column(columnDefinition = "MEDIUMBLOB")
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


}
package com.web.bds.blogservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@Table(name = "blog")
public class Blog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_blog;
	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private Date date_create;
	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private Date date_modified;
	@Column
	private String name_blog;
	@Column
	private int id_blogcate;
	@Column
	private String content_blog;
	@Column
	private int person_modified;
	@Column
	private boolean status_blog = true;

	
}

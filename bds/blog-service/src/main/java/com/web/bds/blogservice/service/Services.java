package com.web.bds.blogservice.service;

import java.util.List;


public interface Services<T> {

	void delete(int id);
	
	void add(T t);

	T findOne(int id);

	void update(T t);

	T update(int id, T t);

	List<T> listAll();
	
	List<T> listById(int id);
	
	List<T> listByName(String name);
	
	

}	

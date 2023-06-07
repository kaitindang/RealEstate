package com.web.bds.productservice.service;

import java.util.List;

public interface Servicese<T> {


    void add(T t);

    T findOne(int id);

    void update(T t);

    T update(int id, T t);

    void delete(int id);

    List<T> listAll();

    List<T> listById(int id);

    List<T> listByName(String name);


}

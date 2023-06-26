package com.web.bds.productservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface Servicese<T> {


    void add(T t);

    T findOne(int id);

    void update(T t);

    T update(int id, T t);

    void delete(int id);

    Page<T> listAll(Pageable pageable);

    List<T> listById(int id);

    List<T> listByName(String name);

    List<T> listProductWaitingApprove();
}

package com.ural.tech.store;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PointsRepository extends JpaRepository<Points, Long> {

    List<Points> findAll();

}

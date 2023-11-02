package com.ural.tech.store;


import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "status")
public class Points {

    public static final int START_SEQ = 10;
    @Id
    @SequenceGenerator(name = "global_seq", sequenceName = "global_seq", allocationSize = 1, initialValue = START_SEQ)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global_seq")
    @Column(name = "point_id")
    Long id;
    @Column()
    String status;
    @Column()
    String pointCoordinates;
    @Column()
    String description;

    //todo сылка на файл в виде строки

    @Column()
    Instant createdAt = Instant.now();

    public Points() {
    }

    public Points(String status, String pointCoordinates, String description) {
        this.status = status;
        this.pointCoordinates = pointCoordinates;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getPointCoordinates() {
        return pointCoordinates;
    }

    public String getDescription() {
        return description;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
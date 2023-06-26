package com.web.bds.authservice.entity;


import com.web.bds.authservice.Enum.ERole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roles_id")
    private Integer id;

    @Column(name = "rolename")
    @Enumerated(EnumType.STRING)
    private ERole name;


}

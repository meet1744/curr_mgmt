package com.springboot.CurriculumManagement.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "HOD")
public class HOD {
    @Id
    private String HODId;
    @Column(nullable = false)
    private String HODName;
    @Column(nullable = false)
    private String password;
//    @Column(nullable = false)
//    private String departmentName;
    @Column(unique = true, nullable = false)
    private String emailId;

    @OneToOne
    @JoinColumn(name = "deptId", nullable = false)
    private Department dept;

    public HOD() {
        super();
    }

    public String getHODId() {
        return HODId;
    }

    public void setHODId(String HODId) {
        this.HODId = HODId;
    }

    public String getHODName() {
        return HODName;
    }

    public void setHODName(String HODName) {
        this.HODName = HODName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
